// このファイルはRSCサイトのイベント情報のフロントエンド用のモックデータと
// 申し込み締め切り（開催開始時刻の30分前）を自動判定するロジックを含みます。

// 実際の現在時刻を取得する処理は関数内で実行する

const calculateDeadline = (isoDateStr, displayTimeStr) => {
    if (!isoDateStr) return null;

    // イベント開始時刻を作成 (UTC -> ローカルに変換される)
    const startTime = new Date(isoDateStr);

    if (displayTimeStr) {
        const dateStrMatch = displayTimeStr.match(/(\d+):(\d+)/);
        if (dateStrMatch) {
            const startHour = parseInt(dateStrMatch[1], 10);
            const startMinute = parseInt(dateStrMatch[2], 10);
            startTime.setHours(startHour, startMinute, 0, 0);
        }
    }
    
    // 開始時刻の30分前を設定（ミリ秒で計算）
    return new Date(startTime.getTime() - 30 * 60 * 1000);
};

const applyDeadlineStatus = (groupedEvents) => {
    const now = new Date();

    return groupedEvents.map(event => {
        // 親の代表ステータスと、各schedulesのステータスをそれぞれ判定する
        
        // 子スケジュールをループして判定
        const updatedSchedules = event.allSchedules.map(schedule => {
            let status = schedule.status;
            if (status === 'open') {
                const deadline = calculateDeadline(schedule.date, schedule.time);
                if (deadline && now > deadline) {
                    status = 'closed';
                }
            }
            return { ...schedule, status };
        });

        // 代表スケジュールのステータスも更新
        // updatedSchedulesの中に1つでも 'open' な日程があれば、代表ステータスも 'open' にする
        const hasOpenSchedule = updatedSchedules.some(s => s.status === 'open');
        const hasFullSchedule = updatedSchedules.some(s => s.status === 'full');
        
        let mainStatus = 'closed';
        if (hasOpenSchedule) {
            mainStatus = 'open';
        } else if (hasFullSchedule) {
            mainStatus = 'full';
        }

        return {
            ...event,
            status: mainStatus,
            allSchedules: updatedSchedules
        };
    });
};

import { client } from '../lib/microcms';

export const getEventSchedule = async () => {
    try {
        // 1. 開催日程(schedules)を取得
        // date の昇順（古い順/近い順）で取得し、ステータスがclosed以外のものを優先するなどの条件も指定可能
        const schedulesRes = await client.getList({
            endpoint: 'schedules',
            queries: {
                orders: 'date',
                limit: 100
            }
        });

        const schedules = schedulesRes.contents;

        // イベントIDごとに日程をグループ化するマップ
        const eventMap = new Map();

        // 2. 日程データをもとに、親であるイベント(event)ごとにまとめる
        schedules.forEach(schedule => {
            // schedule.event には紐付けられた「勉強会マスター」のデータが入っている
            const eventData = schedule.event;
            
            if (!eventData) return; // 親イベントが設定されていない場合はスキップ

            const eventId = eventData.id;

            // まだマップに登録されていないイベントなら初期化
            if (!eventMap.has(eventId)) {
                // カンマ区切りのタグ文字列を配列に変換
                const tagsArray = eventData.tags 
                    ? eventData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) 
                    : [];

                eventMap.set(eventId, {
                    id: eventId,
                    title: eventData.title,
                    category: eventData.category,
                    description: eventData.description,
                    capacity: eventData.capacity,
                    fee: eventData.fee,
                    tags: tagsArray,
                    thumbnail: eventData.thumbnail ? eventData.thumbnail.url : null,
                    // アジェンダは今回のCMS設計ではテキストエリア等にまとめている想定のため、一旦descriptionに含めるか別途パースが必要
                    // 以前の配列形式(agenda)に合わせるためのモック処理を残す（必要に応じてCMSの構造に合わせて改修）
                    agenda: [], 
                    
                    // 以下はフロント側で表示するための代表（直近）の日程情報
                    // 1つ目の日程をデフォルトとしてセット
                    date: schedule.date, // ※表示用にフォーマットが必要な場合あり
                    time: schedule.time,
                    location: schedule.location,
                    remaining: schedule.remaining,
                    status: schedule.status,
                    
                    // 全ての日程を配列として保持
                    allSchedules: []
                });
            }

            // イベントの全日程リストに追加
            eventMap.get(eventId).allSchedules.push({
                id: schedule.id,
                date: schedule.date,
                time: schedule.time,
                location: schedule.location,
                remaining: schedule.remaining,
                status: Array.isArray(schedule.status) ? schedule.status[0] : schedule.status
            });
        });

        // Mapのvalueを配列に変換
        const groupedEvents = Array.from(eventMap.values());

        return applyDeadlineStatus(groupedEvents);

    } catch (error) {
        console.error("Failed to fetch events from microCMS:", error);
        // エラー時は空配列を返すか、エラーハンドリングを行う
        return [];
    }
};
