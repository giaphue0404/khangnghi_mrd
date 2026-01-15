export default async (request, context) => {
    const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
    const ip = context.ip;

    // Đồng bộ với src/utils/detectBot.ts
    const blockedPatterns = [
        'bot', 'crawler', 'spider', 'puppeteer', 'selenium', 'http', 'client',
        'curl', 'wget', 'python', 'java', 'ruby', 'go', 'scrapy', 'lighthouse',
        'censysinspect', 'krebsonsecurity', 'ivre-masscan', 'ahrefs', 'semrush',
        'sistrix', 'mailchimp', 'mailgun', 'larbin', 'libwww', 'spinn3r', 'zgrab',
        'masscan', 'yandex', 'baidu', 'sogou', 'tweetmeme', 'misting', 'botpoke',
        'scraper', 'scan', 'headless', 'phantom'
    ];

    // Blocked ASNs (Google, Facebook, Microsoft, etc.)
    const blockedASNs = [
        15169, 32934, 396982, 8075, 16510, 198605, 45102, 201814, 14061, 214961,
        401115, 135377, 60068, 55720, 397373, 208312, 63949, 210644, 6939, 209,
        51396, 147049
    ];

    // Blocked specific IPs
    const blockedIPs = ['95.214.55.43', '154.213.184.3'];

    const isBlocked = blockedPatterns.some(pattern => userAgent.includes(pattern));

    if (isBlocked) {
        console.log(`[BLOCKED] IP: ${ip}, UA: ${userAgent}`);
        return new Response(null, {
            status: 444
        });
    }

    // Check blocked IPs
    if (blockedIPs.includes(ip)) {
        console.log(`[BLOCKED IP] IP: ${ip}`);
        return new Response(null, {
            status: 444
        });
    }

    return context.next();
};

