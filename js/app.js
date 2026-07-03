/* ========================================
   Interview Feedback AI - Demo App Logic
   ======================================== */

/// ===== Mock Data =====
const CRITERIA = [
  { key:'icebreak_listening', name:'アイスブレイク・傾聴力', icon:'🤝' },
  { key:'question_deepening', name:'質問・深掘り力', icon:'🔍' },
  { key:'attract_structure', name:'アトラクト・構造化', icon:'✨' }
];

const MOCK_FEEDBACKS = {
  tanaka: {
    title: '田中面接官_0415.mp4',
    subtitle: '2026/04/15 14:30 ・ 28分 ・ 245MB',
    total: 14, grade: 'A', gradeLabel: '模範的な面接対応', diff: '+4',
    scores: { icebreak_listening: 5, question_deepening: 5, attract_structure: 4 },
    strengths: [
      '冒頭の雑談で非常に自然に応募者の緊張をほぐし、話しやすい安心感のある空気を作れている。',
      '「FAQ集を作成した」という応募者の一言に対し、「周囲の巻き込み方は？」と極めて精度の高い深掘り質問を行い、具体的な行動特性を引き出している。',
      '応募者の発言内容を適切なタイミングで要約し、次の話題へとスムーズに繋ぐ高い傾聴スキルが確認できる。'
    ],
    improvements: [
      '後半の事業説明パートにおいて、自社の魅力アピールに集中するあまり、やや一方的な長話になってしまった点。'
    ],
    details: {
      icebreak_listening: { score: 5, comment: '冒頭でのアイスブレイクが非常に効果的。応募者の話を遮らずにしっかりと最後まで聴き切る姿勢が徹底されており、大変話しやすい雰囲気を作り出せています。', timestamps: ['00:05', '03:45'] },
      question_deepening: { score: 5, comment: '応募者の「FAQ作成」のエピソードに対し、周囲を数字でどう説得したか、また他部署との連携をどう行ったかを具体的に掘り下げる的確な深掘り質問ができています。', timestamps: ['06:10', '09:30'] },
      attract_structure: { score: 4, comment: '自社のカスタマーサポートのビジョン（攻めのCS）を明確に説明できているものの、後半の事業説明パートがやや一方的で長くなってしまった点が惜しいです。', timestamps: ['15:45', '17:45'] }
    },
    overall: '全体として非常に質の高い面接対応です。傾聴と深掘りのバランスが取れており、面接官のスキルが極めて高いレベルにあります。後半の自社アピールの時間配分を最適化するとさらに良いでしょう。',
    transcription: [
      { time: '00:05', speaker: '面接官', text: '本日はお時間をいただきありがとうございます。田中と申します。緊張されていますか？' },
      { time: '00:12', speaker: '応募者', text: 'はい、少し緊張していますが、よろしくお願いいたします。' },
      { time: '00:25', speaker: '面接官', text: '大丈夫ですよ、リラックスしてお話ししましょう。今日はこちらまでどう来られましたか？' },
      { time: '00:32', speaker: '応募者', text: '電車で参りました。外はかなり気温が上がっていますね。' },
      { time: '01:05', speaker: '面接官', text: 'そうですね、水分をしっかり摂ってくださいね。それでは、前職でのカスタマーサポートのご経験について、簡単にお話しいただけますか？' },
      { time: '01:20', speaker: '応募者', text: 'はい。前職ではコールセンターにて約3年間、電話およびメールでの顧客対応を行っておりました。そこでは月間約800件のお問い合わせに対応しておりました。' },
      { time: '02:10', speaker: '面接官', text: '月間800件はかなりのボリュームですね。対応する中で、どのようなお客様を担当されることが多かったですか？' },
      { time: '02:35', speaker: '応募者', text: '主には個人のお客様からのサービス仕様に関するご質問や、一部法人プランのご契約様からのトラブル窓口も担当しておりました。' },
      { time: '03:15', speaker: '面接官', text: 'なるほど、個人と法人の両方に対応されていたのですね。対応品質を保つために、メンタル面や健康面で気をつけていたことはありますか？' },
      { time: '03:45', speaker: '応募者', text: 'どんなに忙しい時でも、第一声の明るさと、相手の話を最後まで遮らずに聴き切ることを心がけ、ストレスは業務後に運動することで発散していました。' },
      { time: '04:30', speaker: '面接官', text: '素晴らしいですね。単に業務をこなすだけでなく、顧客心理に寄り添い自己管理もしっかり行われていたことが伺えます。' },
      { time: '05:30', speaker: '面接官', text: '月間800件は素晴らしい対応数ですね。業務をこなす中で、ご自身で工夫されたポイントはありますか？' },
      { time: '05:45', speaker: '応募者', text: 'よくある質問のパターンを分析し、先回りして解決策を盛り込んだ独自のFAQ集を作成しました。これにより対応時間の20%短縮を達成しました。' },
      { time: '06:10', speaker: '面接官', text: '自発的にFAQ集を作られたのは素晴らしいですね。その FAQ集を他のメンバーに展開する際、周囲から反対や課題はありましたか？またそれをどう乗り越えましたか？' },
      { time: '06:35', speaker: '応募者', text: 'はい、当初は「余計な作業が増える」と一部で反対されましたが、実際に使うことで各自の残業が減るメリットを数字で提示し、導入を説得しました。' },
      { time: '07:15', speaker: '面接官', text: '数字でメリットを示すのは説得力がありますね。周囲を巻き込む上で、他に工夫した点はありますか？' },
      { time: '07:35', speaker: '応募者', text: 'はい、FAQを更新しやすくするため、Googleスプレッドシートと連携させ、誰でも1分で更新できる簡易システムを整えました。' },
      { time: '09:30', speaker: '面接官', text: '素晴らしい工夫ですね。では次の評価項目に移ります。前職のカスタマーサポートで最も困難だったトラブルと、その解決プロセスについて教えてください。' },
      { time: '09:50', speaker: '応募者', text: 'はい、大規模なシステム障害が発生した際、通常の3倍以上の電話が殺到しました。その際は、パニックにならずにお客様の状況を冷静に切り分け、優先度の高い二次被害を防ぐ案内を優先しました。' },
      { time: '10:45', speaker: '面接官', text: 'トラブル発生時、お一人で冷静に対応されたとのことですが、お客様への対応時間を短縮するためのテクニックや心がけはありましたか？' },
      { time: '11:15', speaker: '応募者', text: 'はい、お客様が感情的になっている場合は、まず話を遮らずにすべて吐き出していただくことで、3分ほどで落ち着いていただけることが多かったです。その後、事実確認を冷静に行いました。' },
      { time: '12:00', speaker: '面接官', text: '緊急時こそ冷静なトリアージが必要ですね。その際、他部署への連携はスムーズに行えましたか？' },
      { time: '12:20', speaker: '応募者', text: 'はい、開発チームへ随時障害のパターンを共有し、特設FAQを迅速にアップデートしてもらうよう働きかけました。' },
      { time: '13:30', speaker: '面接官', text: '他部署へのエスカレーションや連携において、伝える情報の整理で気をつけていたことは何ですか？' },
      { time: '14:00', speaker: '応募者', text: '「発生している事象」「影響範囲」「お客様のご要望」を3点にまとめ、チャットで即座に開発へ送るテンプレートを事前に用意して運用していました。' },
      { time: '15:45', speaker: '面接官', text: '自部署だけでなく他部署を巻き込んだ迅速な対応ができていますね。ここからは、当社のカスタマーサポート部門のビジョンについてお話しします。私たちは単なる「受け口」ではなく、顧客の声をプロダクト開発に還元するチームを目指しています。' },
      { time: '16:20', speaker: '応募者', text: '私の「FAQを分析して改善する」という経験とも非常に親和性を感じます。顧客ニーズの分析にはぜひ貢献したいです。' },
      { time: '17:45', speaker: '面接官', text: '当社のCSでは、単なるサポートにとどまらず、プロダクトの仕様改善を提案する『攻めのCS』を求めています。これまでのご経験をどう活かせそうですか？' },
      { time: '18:15', speaker: '応募者', text: 'はい、FAQの作成だけでなく、問い合わせの傾向をタグ付けして月次レポートを作成していました。これと同様に、プロダクト開発会議にCSの代表としてデータを持参し提案できると考えています。' },
      { time: '20:00', speaker: '面接官', text: 'そう言っていただけると嬉しいです。現在チームは10名ほどですが、もしご入社いただいた場合、どのような役割を担っていきたいですか？' },
      { time: '20:30', speaker: '応募者', text: 'まずは実務を通じて信頼を築き、中長期的にはメンバーの研修体制や、対応品質の平準化をリードする役割に挑戦したいです。' },
      { time: '22:15', speaker: '面接官', text: '中長期的にチームリーダーを目指したいとのこと、非常に心強いです。メンバー育成において、ご自身が大切にしたいスタンスはありますか？' },
      { time: '22:45', speaker: '応募者', text: 'ただ正解を教えるのではなく、なぜその対応が必要なのかを背景の顧客心理から説明し、自分で考える力を養ってもらうような指導を心がけたいです。' },
      { time: '25:30', speaker: '面接官', text: '非常に頼もしいですね。何かこちらにご質問はありますか？' },
      { time: '25:50', speaker: '応募者', text: 'はい、入社後にスムーズに業務へキャッチアップするための教育体制や、最初の1ヶ月で期待される成果について教えていただけますでしょうか。' },
      { time: '26:15', speaker: '面接官', text: '良い質問ですね。最初の2週間は座学とOJTで業務知識を学んでいただき、1ヶ月後には標準的な問い合わせ対応を一人で完結できるようになることを期待しています。' },
      { time: '28:00', speaker: '面接官', text: '本日は貴重なお話をたくさんお聞かせいただき、ありがとうございました。気をつけてお帰りください。' }
    ]
  },
  suzuki: {
    title: '鈴木面接官_0412.mp4',
    subtitle: '2026/04/12 10:00 ・ 32分 ・ 310MB',
    total: 11, grade: 'B', gradeLabel: '良好、標準的', diff: '+2',
    scores: { icebreak_listening: 4, question_deepening: 4, attract_structure: 3 },
    strengths: [
      '質問の意図が明確で、次にどんな質問をするのかの構造化ができているため、終始安定した進行が行えている。',
      '応募者の「アパレルでの接客経験」に対して高い興味を示し、仕事の面白さややりがいを上手く聞き出せている。'
    ],
    improvements: [
      '緊張のためか、声のトーンや表情がやや硬く見え、応募者への受容的な雰囲気が十分に伝わっていない点。',
      '応募者が回答に迷って沈黙した際、すぐに助け舟を出さず、ややプレッシャーを与える沈黙を作ってしまった点。'
    ],
    details: {
      icebreak_listening: { score: 4, comment: '丁寧な言葉遣いで対応しており好印象です。もう少し表情を和らげ、共感の相槌（「なるほど」「それは大変でしたね」など）を増やすと雰囲気が和らぎます。', timestamps: ['00:15', '05:00'] },
      question_deepening: { score: 4, comment: 'アパレル店でのクレーム対応エピソードにおいて、具体的な応対内容を引き出す的確な質問ができています。', timestamps: ['07:20', '12:40'] },
      attract_structure: { score: 3, comment: '自社のインサイドセールスの魅力説明がやや機能的な解説に終始しており、働く側の感情（やりがい、成長環境）へのアトラクトがやや不足しています。', timestamps: ['25:10'] }
    },
    overall: '面接官としての基本要件は十分にクリアしています。質問の設計と時間配分は良好ですが、応募者の緊張を解くための「自己開示」や「柔らかなリアクション」を取り入れることで、さらに入社意向を高める面接が可能になります。',
    transcription: [
      { time: '00:10', speaker: '面接官', text: '本日はよろしくお願いいたします。鈴木と申します。緊張なさっていますか？' },
      { time: '00:20', speaker: '応募者', text: '少し緊張していますが、よろしくお願いいたします。鈴木と申します。' },
      { time: '01:30', speaker: '面接官', text: 'アパレルショップにお勤めだったのですね。仕事の中でやりがいを感じた瞬間について教えてください。' },
      { time: '01:45', speaker: '応募者', text: 'お客様の好みやお悩みを引き出して提案し、喜んでいただけた時です。' },
      { time: '02:30', speaker: '面接官', text: 'アパレルからコールセンター（インサイドセールス）への転身を考えたきっかけは何でしょうか？' },
      { time: '03:00', speaker: '応募者', text: '接客の中で培った『顧客の真のニーズを引き出す力』を、より広い範囲で活かしたいと考えたためです。電話越しでも信頼関係を築けるスキルを身につけたいと思いました。' },
      { time: '03:50', speaker: '面接官', text: 'なるほど。ただ、対面と非対面ではコミュニケーションの難しさが大きく異なりますが、その点はどう克服するつもりですか？' },
      { time: '04:30', speaker: '応募者', text: 'ええと、そうですね...やはり表情が見えない分、声のトーンや話すスピードに一層気をつける必要があると考えています。' },
      { time: '05:10', speaker: '面接官', text: '分かりました。では、アパレルでの販売目標に対する取り組みについて教えてください。' },
      { time: '05:40', speaker: '応募者', text: '個人目標として月間120%達成を掲げ、顧客カルテの作成と事前のスタイリング提案を徹底し、リピート率向上に努めました。' },
      { time: '06:30', speaker: '面接官', text: 'なるほど。目標達成のための具体的なアクションプランはご自身で立てたのですか？' },
      { time: '06:50', speaker: '応募者', text: 'はい、店長と相談しながら週単位での数値をトラッキングしました。' },
      { time: '07:20', speaker: '面接官', text: 'ありがとうございます。これまでで特に対応が難しかったお客様とのエピソードはありますか？' },
      { time: '07:40', speaker: '応募者', text: '商品の配送遅延でお叱りを受けたことがありました。その際は徹底的にお話を傾聴し、誠実に対応いたしました。' },
      { time: '08:15', speaker: '面接官', text: '徹底的な傾聴ですか。具体的に相手の話のどういう部分にフォーカスし、どのような言葉かけを行いましたか？' },
      { time: '08:35', speaker: '応募者', text: 'まずは「楽しみにされていた予定を壊してしまったこと」へのお詫びを述べ、相手の感情に徹底して寄り添いました。' },
      { time: '10:15', speaker: '面接官', text: 'お詫びと寄り添いですね。その結果、そのお客様との関係はどう変化しましたか？' },
      { time: '10:35', speaker: '応募者', text: '最終的には「丁寧に対応してくれてありがとう、またここで購入するよ」と言っていただき、リピート購入に繋がりました。' },
      { time: '11:45', speaker: '面接官', text: 'それは素晴らしい実績ですね。アパレルとインサイドセールスでは顧客との関わり方に違いがありますが、難しさを感じる部分はどこだと思いますか？' },
      { time: '12:15', speaker: '応募者', text: 'アパレルは対面なので表情で感情を察せますが、電話やチャットでは言葉遣いや声のトーンだけで信頼感を与える必要がある点です。' },
      { time: '13:40', speaker: '面接官', text: 'クレームをチャンスに変えた素晴らしい体験ですね。では、インサイドセールスとしてのキャリアビジョンについてどうお考えですか？' },
      { time: '14:10', speaker: '応募者', text: 'ゆくゆくは新規メンバーの育成や、商談獲得率を向上させるためのトークスクリプト改善など、組織全体の成果最大化に貢献したいです。' },
      { time: '15:30', speaker: '面接官', text: 'なるほど、メンバー育成にも意欲があるのですね。これまで後輩の指導やトレーニングに関わったご経験はありますか？' },
      { time: '16:00', speaker: '応募者', text: 'はい、前職の店舗で新入社員のOJTリーダーを担当し、接客マニュアルのブラッシュアップや現場指導を行いました。' },
      { time: '18:00', speaker: '面接官', text: 'なるほど。チームでの協働において、大切にしている価値観はありますか？' },
      { time: '18:25', speaker: '応募者', text: '他メンバーの良いアプローチを積極的に真似し、自分の成功パターンも惜しみなく共有することでお互いを高め合うことを大切にしています。' },
      { time: '22:30', speaker: '面接官', text: 'ありがとうございます。それでは、当社のサービス内容や今後の目標について少し説明させていただきますね。' },
      { time: '23:00', speaker: '応募者', text: 'はい、よろしくお願いいたします。' },
      { time: '24:10', speaker: '面接官', text: '当社のサービスはBtoBのSaaS製品で、お客様の課題をヒアリングして適切な資料をお送りする流れになります。' },
      { time: '24:45', speaker: '応募者', text: 'BtoBの商材は未経験ですが、基本的な製品知識をいち早く吸収し、顧客のビジネスモデルを理解してアプローチしたいと考えています。' },
      { time: '26:15', speaker: '面接官', text: 'インサイドセールスは、マーケティングとフィールドセールスを繋ぐハブとなる重要ポジションです。このあたりの連携についてはどう思われますか？' },
      { time: '26:40', speaker: '応募者', text: '前職でも部署間の情報共有の重要性を実感していました。顧客の温度感を正しく引き継ぐ仕組み作りに注力したいです。' },
      { time: '29:50', speaker: '面接官', text: 'ありがとうございます。最後に、入社時期や希望勤務地について確認させてください。' },
      { time: '30:15', speaker: '応募者', text: '内定をいただけましたら、現職の引き継ぎを経て1ヶ月後には勤務可能です。勤務地は東京本社を希望します。' },
      { time: '32:00', speaker: '面接官', text: 'お疲れ様でした。本日の面接は以上となります。ありがとうございました。' }
    ]
  },
  yamada: {
    title: '山田面接官_0410.mp4',
    subtitle: '2026/04/10 16:00 ・ 25分 ・ 198MB',
    total: 8, grade: 'C', gradeLabel: '一部改善が必要', diff: '-1',
    scores: { icebreak_listening: 3, question_deepening: 2, attract_structure: 3 },
    strengths: [
      '終始丁寧な言葉遣いであり、応募者に対して敬意を持って接することができている。',
      '会社の就業形態（在宅ワーク等）に関する事務的な説明は、淀みなくクリアに行えている。'
    ],
    improvements: [
      '応募者の回答に対して「はい、わかりました」と受け流すだけで、次の質問項目へ機械的に移ってしまい、深掘り質問がほぼ行われていない点。',
      '応募者の「在宅ワークが楽そうだから」というやや懸念のある動機に対し、切り返しや業務の難しさ・現実を正しく提示できていない点。'
    ],
    details: {
      icebreak_listening: { score: 3, comment: '言葉遣いは終始丁寧ですが、全体的に尋問のような冷淡なトーンになっており、共感や歓迎の姿勢が伝わりにくいです。', timestamps: ['01:00', '08:30'] },
      question_deepening: { score: 2, comment: '志望動機や前職の退職理由など、重要な懸念点（在宅の動機が希薄等）に対して全く深掘りがされておらず、単に質問リストを消化するだけになっています。', timestamps: ['02:30', '05:00'] },
      attract_structure: { score: 3, comment: '業務説明は淡々と行われていますが、在宅ワークの難しさや期待値の設定が不足しており、ミスマッチ防止のためのアトラクトになっていません。', timestamps: ['16:20'] }
    },
    overall: '質問設計と深掘りの技術についてトレーニングが必要です。マニュアル通りの質問をこなすだけでなく、応募者の発言に耳を傾け、気になった点や懸念点をその場で掘り下げる「対話型」の面接スタイルを意識してください。',
    transcription: [
      { time: '00:08', speaker: '面接官', text: '本日はよろしくお願いいたします。山田と申します。' },
      { time: '00:15', speaker: '応募者', text: 'よろしくお願いいたします。山田と申します。' },
      { time: '01:00', speaker: '面接官', text: '本日の面接ですが、大体20分から30分程度を予定しております。最初はご挨拶も兼ねて、簡単な雑談から始めさせていただきます。本日はオンラインですが、聞き取りやすさに問題はありませんか？' },
      { time: '01:20', speaker: '応募者', text: 'はい、映像も音声も非常にクリアに届いておりますので問題ありません。' },
      { time: '01:45', speaker: '面接官', text: 'それは良かったです。途中で接続が悪くなった場合はいつでもおっしゃってください。' },
      { time: '02:00', speaker: '応募者', text: '承知いたしました。ご配慮いただきありがとうございます。' },
      { time: '02:30', speaker: '面接官', text: '今回の志望動機をお伺いできますか？' },
      { time: '02:50', speaker: '応募者', text: 'はい。在宅ワークに興味がありまして、コールセンターならパソコンを使って仕事ができると思い応募しました。' },
      { time: '03:10', speaker: '面接官', text: 'わかりました。パソコンの操作は得意ですか？' },
      { time: '03:25', speaker: '応募者', text: 'ネットサーフィンや動画編集などをしておりますので、キーボード入力は早い方です。' },
      { time: '04:10', speaker: '面接官', text: 'わかりました。前職ではどのようなお仕事をされていましたか？' },
      { time: '04:25', speaker: '応募者', text: 'アパレル店舗でのレジや在庫管理、それと簡単なデータ入力を担当しておりました。' },
      { time: '05:00', speaker: '面接官', text: 'わかりました。アパレルを退職された理由は何ですか？' },
      { time: '05:15', speaker: '応募者', text: 'シフトが不規則で体調管理が難しくなり、もう少し安定した時間帯で働きたいと思ったためです。' },
      { time: '06:00', speaker: '面接官', text: 'わかりました。今回の在宅勤務での業務ですが、トラブルが発生した場合は一人で対処する必要がありますが、問題ないですか？' },
      { time: '06:25', speaker: '応募者', text: 'チャットツールなどでマニュアルを見ながら進められれば、問題ないと思います。' },
      { time: '07:10', speaker: '面接官', text: 'わかりました。では、これまで一番嬉しかった仕事のエピソードはありますか？' },
      { time: '07:30', speaker: '応募者', text: 'お客様にお礼の言葉を直接いただいたときに、やりがいを感じました。' },
      { time: '08:30', speaker: '面接官', text: 'わかりました。では次の質問に移ります。ストレスは溜まりやすい方ですか？' },
      { time: '08:45', speaker: '応募者', text: '趣味の旅行などで発散していますので、大丈夫だと思います。' },
      { time: '10:10', speaker: '面接官', text: 'そうですか。では、週に何日程度勤務を希望されますか？' },
      { time: '10:25', speaker: '応募者', text: '週に3日、1日3時間程度を希望いたします。' },
      { time: '13:00', speaker: '面接官', text: 'わかりました。その勤務時間で、ご家庭との両立は問題なくできそうですか？' },
      { time: '13:20', speaker: '応募者', text: 'はい、家族の協力も得られておりますので、勤務時間内は業務に集中して取り組めます。' },
      { time: '14:30', speaker: '面接官', text: 'わかりました。パソコンのスペックやご自宅のネットワーク環境は、在宅勤務に適していますか？' },
      { time: '14:55', speaker: '応募者', text: 'はい、光回線を引いており、静かな個室で作業できますのでセキュリティや防音面も問題ありません。' },
      { time: '16:20', speaker: '面接官', text: 'わかりました。では、業務内容に関する説明をスライドを使って行います。当社のカスタマーサポートは、主にメールとチャットでの対応がメインとなります。' },
      { time: '16:50', speaker: '応募者', text: 'メールとチャットですね。文章でのコミュニケーションには自信がありますので、安心いたしました。' },
      { time: '20:00', speaker: '面接官', text: 'わかりました。では、入社後のトレーニングフローについてです。最初の1週間はマニュアルの読み込みとロールプレイングを行います。' },
      { time: '20:30', speaker: '応募者', text: 'しっかりとステップを踏んで学べる環境があるのですね。頑張ります。' },
      { time: '21:30', speaker: '面接官', text: 'わかりました。オンラインでのコミュニケーションにおいて、ご自身で気をつけたいことはありますか？' },
      { time: '21:50', speaker: '応募者', text: 'テキストチャットでは感情が伝わりづらいため、丁寧すぎるほどの表現を心がけ、早めのリアクションを行うようにしたいです。' },
      { time: '23:15', speaker: '面接官', text: 'わかりました。何か質問はありますか？' },
      { time: '23:30', speaker: '応募者', text: '特にありません。わかりやすいご説明ありがとうございました。' },
      { time: '25:00', speaker: '面接官', text: 'わかりました。本日の面接はこれで終了します。ありがとうございました。' }
    ]
  },
  sato: {
    title: '佐藤面接官_0417.mp4',
    subtitle: '2026/04/17 14:00 ・ 30分 ・ 268MB',
    total: 13, grade: 'A', gradeLabel: '模範的な面接対応', diff: 'NEW',
    scores: { icebreak_listening: 5, question_deepening: 4, attract_structure: 4 },
    strengths: [
      '非常に明るくエネルギッシュな態度で、応募者を歓迎する姿勢が強く感じられる。',
      '応募者の自己紹介から「架電実績」の数値にすぐ着目し、アプローチ手法や工夫した点を具体的に聞き出せている。',
      '自社の営業部門のセグメント構成や求める人材像を、非常に明快かつ魅力的にアピールできている。'
    ],
    improvements: [
      '応募者の「短期転職」という履歴書の懸念点に対し、一言尋ねて納得しただけで、組織適応性に関する更なる確認を省略してしまった点。'
    ],
    details: {
      icebreak_listening: { score: 5, comment: '冒頭から「リモートですが問題ないですか？」と優しく声かけし、応募者が話しやすいようにうなずきや相槌を大きく取っています。', timestamps: ['00:05', '01:15'] },
      question_deepening: { score: 4, comment: 'アポイント率の数値に対して、その成果を出した要因（時間帯分析など）を論理的に解きほぐす良い質問設計でした。', timestamps: ['08:45', '14:20'] },
      attract_structure: { score: 4, comment: '自社のIT商材の強みを魅力的に語れています。営業チームの構成や研修体制についても構造的に説明できています。', timestamps: ['22:10'] }
    },
    overall: '非常に頼もしく、魅力的な面接官です。応募者の営業的資質を見極めつつ、自社の強みを熱意を持って伝えられています。今後は、応募者の「組織適応性」や「マニュアル遵守姿勢」など、協調性に関するチェック質問を1つ加えると、よりバランスの良い面接評価になります。',
    transcription: [
      { time: '00:05', speaker: '面接官', text: '本日はお時間をいただきありがとうございます！佐藤と申します。どうぞよろしくお願いいたします。' },
      { time: '00:15', speaker: '応募者', text: 'よろしくお願いいたします。佐藤と申します。' },
      { time: '00:45', speaker: '面接官', text: '本日はリモートでの面接となりますが、通信環境などは問題ないでしょうか？' },
      { time: '00:55', speaker: '応募者', text: 'はい、問題なく聞こえております。画面もクリアに見えております。' },
      { time: '01:15', speaker: '面接官', text: '良かったです！それでは最初に、簡単にご自身の自己紹介をお願いできますでしょうか。' },
      { time: '01:30', speaker: '応募者', text: 'はい。直近の2年間はコールセンターでのアウトバウンド営業に従事しており、主に新規の顧客開拓を担当しておりました。' },
      { time: '02:20', speaker: '面接官', text: '自己紹介ありがとうございます。新規の顧客開拓をメインでご担当されていたのですね。非常にやりがいのある分野ですね。' },
      { time: '03:10', speaker: '面接官', text: '前職のコールセンターでの営業実績について、アポイント率平均4.8%というのは非常に高いですね。具体的にどう分析して達成されたのですか？' },
      { time: '03:30', speaker: '応募者', text: '光回線の新規架電にて、繋がりやすい時間帯のログ解析と、最初の5秒のトークスクリプトを顧客のテンポに合わせて調整しました。' },
      { time: '04:15', speaker: '面接官', text: '「最初の5秒のテンポ調整」というのは具体的にどのような工夫ですか？' },
      { time: '04:35', speaker: '応募者', text: '例えば、忙しそうな声の場合は「1分だけ」と要約し、そうでない場合は興味を引く質問から入るなど、声質から相手の状況を察知して切り替えていました。' },
      { time: '05:20', speaker: '面接官', text: '素晴らしいアドリブと実行力ですね！相手の状況を察知してコントロールしている。では、架電数が落ち込んだり、モチベーション維持が難しかったりした時はどう対応しましたか？' },
      { time: '05:50', speaker: '応募者', text: 'アポイントが取れない時こそ、断られた理由をログに記録し、\'_この時間帯はこのトークが良い\'_といった仮説検証を繰り返すことで、ゲーム感覚で楽しんで乗り切りました。' },
      { time: '06:40', speaker: '面接官', text: 'なるほど、仮説検証を自発的に楽しむ姿勢は当社の営業カルチャーにも非常にマッチしています！他メンバーとのナレッジ共有はされましたか？' },
      { time: '07:10', speaker: '応募者', text: 'はい、週次のミーティングで私のトークパターンをリスト化して共有したところ、チーム全体の平均アポイント率が15%向上しました。' },
      { time: '08:00', speaker: '面接官', text: 'それはチームへの素晴らしい貢献ですね！ぜひ具体的な数値をお聞きしたいですが、どうトラッキングしましたか？' },
      { time: '08:20', speaker: '応募者', text: 'スプレッドシートを用いて、メンバーごとのアポイント数とトークパターンを紐付けを行いました。' },
      { time: '08:45', speaker: '面接官', text: 'なるほど、数値の可視化まで徹底されていたのは流石です。ぜひ当社のIT商材の営業チームでもその強みを発揮していただきたいです。当社の営業は現在3つのセグメントに分かれていまして...' },
      { time: '10:30', speaker: '面接官', text: 'この3つのセグメントの中で、ご自身の経験が最も活きると感じるのはどこでしょうか？' },
      { time: '11:00', speaker: '応募者', text: 'やはり新規アプローチを中心とするアウトバウンド部門です。前職での即座のスクリプト改善力を活かして、初動の商談化率を高められると確信しています。' },
      { time: '11:15', speaker: '面接官', text: 'アウトバウンド営業において、新規開拓での架電リストの選定やアプローチ先の優先順位付けはどのようにされていましたか？' },
      { time: '11:45', speaker: '応募者', text: '過去の取引実績や業種別の架電結果データを基に、アポイント獲得率の高い業種トップ3を抽出し、朝の早い時間帯に集中してアプローチするなどの工夫をしておりました。' },
      { time: '12:50', speaker: '面接官', text: '非常に頼もしい回答ですね！実際にその部署では個人の裁量も大きく、挑戦的なカルチャーです。そのような環境でプレッシャーに直面した時、どう克服しますか？' },
      { time: '13:20', speaker: '応募者', text: 'プレッシャーや厳しい状況こそ、自分の成長の最大の機会だと捉えています。課題を細分化し、小さな成功を積み上げることで乗り越えてきました。' },
      { time: '15:00', speaker: '面接官', text: 'プレッシャーに強いのは心強いです。ところで、これまで営業職をされる中で、最も狙い通りにいかず辛かったエピソードは何ですか？' },
      { time: '15:20', speaker: '応募者', text: '入社直後、目標が3ヶ月連続で未達成だった時期です。その際は、成績トップの先輩に同行をお願いし、トークのテンポや間取りの違いを徹底的に分析して克服しました。' },
      { time: '15:40', speaker: '面接官', text: '素晴らしいレジリエンス（精神的回復力）をお持ちですね。当社の行動指針にもぴったりです！' },
      { time: '18:20', speaker: '面接官', text: '当社の製品群についての説明は以上ですが、ここまでの部分で何かご質問はありますか？' },
      { time: '18:45', speaker: '応募者', text: '実際のチームにおける評価制度や、目標設定のフローについて教えていただけますか。' },
      { time: '21:15', speaker: '面接官', text: '目標設定は四半期ごとに行われ、定量目標と定性的な挑戦目標の双方で評価します。やりがいは非常に大きいですよ！' },
      { time: '21:45', speaker: '応募者', text: '定性的な挑戦目標も評価対象になるのは非常に魅力的ですね。実力を存分に発揮できると感じます。' },
      { time: '22:10', speaker: '面接官', text: 'なるほど。チームの構成としては、現在は20代から30代がメインで、活気のある営業チームになっています。' },
      { time: '22:40', speaker: '応募者', text: '若手が多く活気があるのですね。お互いにノウハウを共有しつつ競い合える環境は非常に魅力的だと感じます。' },
      { time: '24:40', speaker: '面接官', text: 'そうですね。自発的に動く人が評価される組織です。他にご質問や, 確認しておきたい点はありますか？' },
      { time: '25:10', speaker: '応募者', text: '入社までに自主学習しておくと良い業界知識や製品の仕様書などがあれば、教えていただきたいです。' },
      { time: '26:00', speaker: '面接官', text: '業界知識については、入社後に研修プログラムがありますので、そこまで心配しなくても大丈夫です。' },
      { time: '26:30', speaker: '応募者', text: '研修プログラムが整っているのですね、それを聞いて安心いたしました。自社プロダクトの価値を正しく伝えられるよう、まずは基礎からしっかり学びたいです。' },
      { time: '27:30', speaker: '面接官', text: '意欲的で素晴らしいですね！入社決定後に、おすすめの書籍リストと初級マニュアルを送付しますので、そちらを参考にしてください。' },
      { time: '30:00', speaker: '面接官', text: '本日はありがとうございました。今後の流れについては後ほどメールでご連絡いたします。' }
    ]
  },
  takahashi: {
    title: '高橋面接官_0417.mp4',
    subtitle: '2026/04/17 14:00 ・ 27分 ・ 231MB',
    total: 11, grade: 'B', gradeLabel: '良好、標準的', diff: 'NEW',
    scores: { icebreak_listening: 4, question_deepening: 4, attract_structure: 3 },
    strengths: [
      '非常に穏やかで誠実な対応。応募者の話を否定せず、クッション言葉（おっしゃる通りですね、等）を用いて丁寧に肯定している。',
      'トラブル対応の経験を聞く際、事実関係と応募者の心境の変化を丁寧に切り分けてヒアリングできている。'
    ],
    improvements: [
      '会社説明や求める人物像の説明が少々教科書的（ホームページの文言そのまま）であり、会社独自の魅力が応募者に伝わりにくい点。',
      '応募者がエスカレーション重視の姿勢を示したのに対し、一歩進んだ「自己判断の基準」についても問いを投げかけておきたかった点。'
    ],
    details: {
      icebreak_listening: { score: 4, comment: '応募者を安心させる受容力は抜群です。話し方が非常に優しく、相手が話しやすいペースを保つことができています。', timestamps: ['02:40', '12:10'] },
      question_deepening: { score: 4, comment: 'クレーム対応での対応手順やエスカレーションのフローについて、漏れのない確認的質問ができています。', timestamps: ['07:15', '09:30'] },
      attract_structure: { score: 3, comment: '業務のメリットは説明できていますが、会社のビジョンや「なぜこの仕事をやってほしいのか」という動機付けの提示が弱いです。', timestamps: ['20:00'] }
    },
    overall: '応募者の素直さや業務適性を安心して確認できる、丁寧な面接進行でした。アトラクト力をさらに高めるために、次期採用面接では「自分がこの会社に入って一番やりがいを感じている生の声」を織り交ぜてアピールすると効果的です。',
    transcription: [
      { time: '00:08', speaker: '面接官', text: '本日はどうぞよろしくお願いいたします。高橋と申します。' },
      { time: '00:15', speaker: '応募者', text: 'よろしくお願いいたします。高橋と申します。' },
      { time: '00:45', speaker: '面接官', text: '本日の流れですが、まずは簡単に自己紹介をいただき、その後で前職の通信販売センターでのご経験について伺い、最後に当社について説明させていただきますね。' },
      { time: '01:20', speaker: '応募者', text: '承知いたしました。よろしくお願いいたします。私の自己紹介をさせていただきます。' },
      { time: '01:50', speaker: '面接官', text: 'はい、お願いいたします。前職ではインバウンド対応がメインだったようですが、具体的にどのような体制のセンターでしたか？' },
      { time: '02:10', speaker: '応募者', text: '約50名規模のコールセンターで、私は主に化粧品や健康食品のカスタマーサポート窓口のオペレーターとして稼働しておりました。' },
      { time: '02:40', speaker: '面接官', text: '通信販売の受信センターで働かれていたのですね。どのようなお問い合わせが多かったですか？' },
      { time: '03:00', speaker: '応募者', text: '定期購入の解約や変更、商品の初期不良に対するお問い合わせでした。' },
      { time: '03:40', speaker: '面接官', text: 'なるほど、定期購入の変更やトラブル対応が主だったのですね。品質を保つために日頃から心がけていたことはありますか？' },
      { time: '04:10', speaker: '応募者', text: 'お客様の言葉の裏にある不満や疑問を先回りして察知し、できるだけ一度の通話で疑問がすべて解決するように、FAQの検索スピードを上げる練習を行っていました。' },
      { time: '04:50', speaker: '面接官', text: '一度の通話で解決させる（First Contact Resolution）姿勢、素晴らしいですね。業務の中で、情報のキャッチアップはどうされていましたか？' },
      { time: '05:30', speaker: '応募者', text: '毎朝、業務開始の15分前に新着の通知情報を必ず確認し、分からない点は先輩に事前に確認する習慣をつけていました。' },
      { time: '06:15', speaker: '面接官', text: '非常に真面目で堅実な取り組みですね。信頼がおけます。では、特に印象に残っているトラブルやクレームの事例についてお伺いできますか？' },
      { time: '07:15', speaker: '面接官', text: 'なるほど。お怒りのお客様に対応した経験と、その時の対処方法について教えていただけますか？' },
      { time: '07:35', speaker: '応募者', text: 'はい。まずは配送遅延に対するお詫びを述べ、配送会社のステータスを確認のうえ迅速に代替案を提示いたしました。' },
      { time: '08:00', speaker: '面接官', text: 'おっしゃる通り、迅速な代替案の提示は最も重要ですね。その際、マニュアルの範囲を超える要望をされた場合は、どのように判断して対応しましたか？' },
      { time: '08:20', speaker: '応募者', text: '独断で判断せず、リーダーへ速やかに状況をエスカレーションして判断を仰ぎました。' },
      { time: '10:15', speaker: '面接官', text: 'エスカレーションの判断基準はご自身の中で明確に決まっていましたか？' },
      { time: '10:45', speaker: '応募者', text: 'はい、金銭的な返金対応や、二次クレームに発展する恐れがある場合、またはマニュアルに直接の記載がない特例については、即座に報告するルールを徹底していました。' },
      { time: '13:30', speaker: '面接官', text: 'なるほど。マニュアル遵守と柔軟な報告姿勢がしっかりできていますね。では、今回の転職理由について教えてください。' },
      { time: '14:00', speaker: '応募者', text: 'これまでは受信のみの対応でしたが、顧客の声を分析して自社製品の改善案を企画するような、より上流の役割に挑戦したいと考えたためです。' },
      { time: '17:15', speaker: '面接官', text: '新卒採用やCSを製品改善のエンジンにするという当社のビジョンに共感いただいたのですね。当社の環境は、スタートアップ気質が残っていますが、その点はどうですか？' },
      { time: '17:45', speaker: '応募者', text: '新しい仕組みやルールを自分たちで作り上げていく過程に携われるのは、前職の大規模センターにはなかった魅力であり、非常にやりがいを感じます。' },
      { time: '20:30', speaker: '面接官', text: '素晴らしい意気込みですね！ただ、変化の激しい環境なのでスピード感も求められますが、適応できそうですか？' },
      { time: '21:00', speaker: '応募者', text: 'はい、前職でも新商品の発売日などは急激な状況変化がありましたが、臨機応変に対応してきた経験があります。' },
      { time: '23:45', speaker: '面接官', text: 'わかりました。最後に、入社後に挑戦してみたい具体的なアイデアや領域はありますか？' },
      { time: '24:15', speaker: '応募者', text: 'まずはメンバーとしての実務を極めつつ、ゆくゆくは問い合わせ分類の自動タグ付けシステムなどを提案し、業務効率化に貢献したいです。' },
      { time: '24:45', speaker: '面接官', text: '面白いアイデアですね！ぜひ入社後に提案してください。では、面接としては以上となります。' },
      { time: '27:00', speaker: '面接官', text: '本日は面接にお越しいただき、本当にありがとうございました。' }
    ]
  },
  ito: {
    title: '伊藤面接官_0416.mp4',
    subtitle: '2026/04/16 16:00 ・ 35分 ・ 312MB',
    total: 10, grade: 'B', gradeLabel: '良好、標準的', diff: 'NEW',
    scores: { icebreak_listening: 4, question_deepening: 3, attract_structure: 3 },
    strengths: [
      '非常に明るくフレンドリーな接し方で、笑いを交えながら応募者との距離感を一気に縮めることに成功している。',
      '会社の福利厚生や働く時間帯の融通について、応募者の希望に親身に寄り添いながら相談に乗れている。'
    ],
    improvements: [
      '応募者と話が盛り上がるあまり、フランクになりすぎて面接官としての適度な緊張感が薄れてしまった点。',
      '応募者が過去の短期離職（半年未満の退職）に言及した際、その根本的な退職理由（耐性不足や組織不適応など）への確認や深掘り質問が甘かった点。'
    ],
    details: {
      icebreak_listening: { score: 4, comment: '親しみやすいキャラクターで応募者の素の表情を引き出せています。ただし、友達同士のようなフランクさに偏らないよう注意も必要です。', timestamps: ['01:10', '15:00'] },
      question_deepening: { score: 3, comment: '過去の「アポ取りが楽しかった」話はよく聞けていますが、複数の短期離職について「何が障壁だったのか」を問う厳しい質問を避けてしまった傾向があります。', timestamps: ['08:20'] },
      attract_structure: { score: 3, comment: 'シフトの柔軟性の説明は明快ですが、業務自体の成果プレッシャーなど、ネガティブな側面の説明が軽く扱われており、ミスマッチ防止のための現実提示（リアル・ジョブ・プレビュー）がやや不十分です。', timestamps: ['25:30'] }
    },
    overall: '量よりも質や相性を重視する面接進行でした。採用決定のための「見極め質問（厳しい退職理由の確認など）」の精度を高めることが課題です。親しみやすさを維持しつつ、要所でフォーマルな視点を取り入れた見極めができるようステップアップを目指しましょう。',
    transcription: [
      { time: '00:05', speaker: '面接官', text: 'こんにちは！本日はどうぞよろしくお願いいたします。伊藤と申します！お話しできて嬉しいです。' },
      { time: '00:15', speaker: '応募者', text: 'よろしくお願いいたします。伊藤と申します。' },
      { time: '01:00', speaker: '面接官', text: '今日は天気が良いですね！オフィスまで来られるのは大変でしたか？' },
      { time: '01:20', speaker: '応募者', text: 'いえ、駅から地下道を通って来られたので、思ったよりスムーズに到着しました。' },
      { time: '02:00', speaker: '面接官', text: 'そうなんですね！良かった〜。前職のテレマのお仕事について、どういった商材を扱われていたのか、フランクに教えていただけますか？' },
      { time: '02:30', speaker: '応募者', text: 'はい、主に個人向けの通販商品の定期購入のご案内や、美容関係のアポイント取得などを担当しておりました。' },
      { time: '03:10', speaker: '面接官', text: '美容関係！楽しそうですね〜。応募者の方の明るい雰囲気なら、お客様もついつい話し込んじゃいそうですね！' },
      { time: '03:35', speaker: '応募者', text: 'ありがとうございます（笑）。実際にお客様と趣味のお話で盛り上がることもよくありました。' },
      { time: '04:10', speaker: '面接官', text: '前職ではテレマーケティングをされていたんですね。お仕事は楽しかったですか？' },
      { time: '04:30', speaker: '応募者', text: 'はい。世間話を交えながら、お客様と仲良くなってアポイントを取るのが本当に楽しかったです！' },
      { time: '05:15', speaker: '面接官', text: '分かります、その楽しさは本当に大切ですよね！目標の数値も厳しいじゃないですか？どうやって数字を追っていました？' },
      { time: '05:45', speaker: '応募者', text: 'そうですね、目標件数はありましたが、私はあまり数字を意識しすぎず、『次の方との会話を楽しもう』とポジティブに取り組んでいました。' },
      { time: '06:30', speaker: '面接官', text: 'あはは、なるほど！確かに楽しむのが一番の結果の近道だったりしますよね。求めている姿勢に近いです。引く力がある。でも、チームの中で意見が対立した時とかはどうしていました？' },
      { time: '06:55', speaker: '応募者', text: '基本的には聞き役に回り、お互いの意見の良い部分を組み合わせて調整するように心がけていました。' },
      { time: '07:35', speaker: '面接官', text: '素晴らしい調整力！チームのムードメーカー的存在だったんですね。' },
      { time: '08:20', speaker: '面接官', text: 'なるほど〜、世間話から仲良くなるのは伊藤さんの人徳ですね！ただ、アポを取るプレッシャーや厳しいお断りで心が折れそうになることはありませんでしたか？' },
      { time: '08:45', speaker: '応募者', text: 'ガチャ切りされると少しショックでしたが、次の方に気持ちを切り替えて乗り切りました。' },
      { time: '11:15', speaker: '面接官', text: 'ポジティブで切り替えが早いのですね！テレマーケティングのコール数はどれくらいでしたか？' },
      { time: '11:45', speaker: '応募者', text: '1日に平均して120件から150件ほどの架電を行い、アポイント獲得目標を毎月安定して達成しておりました。' },
      { time: '14:30', speaker: '面接官', text: '1日150件！かなりの行動量ですね！お客様と仲良くなるための会話の「掴み」のコツなどはありますか？' },
      { time: '15:00', speaker: '応募者', text: '相手の話すスピードや声のトーンに自分の波長を合わせる『ペーシング』という技術を意識して、警戒心を解いておりました。' },
      { time: '20:00', speaker: '面接官', text: '切り替えが早いのは素晴らしい！ただ、履歴書を見るといくつか短期のご転職があるようですが、これはどうしてですか？' },
      { time: '20:20', speaker: '応募者', text: '家庭の事情や引っ越しなどが重なり、やむを得ず離職することになりました。今は完全に落ち着いております。' },
      { time: '23:45', speaker: '面接官', text: 'なるほど。転職回数についてもご事情があったのですね。今回の入社にあたって、長く安定して働けそうでしょうか？' },
      { time: '24:15', speaker: '応募者', text: 'はい、家庭の状況も落ち着き、今回は腰を据えて長期的にキャリアを築いていきたいと考えております。' },
      { time: '27:30', speaker: '面接官', text: '分かりました。入社後の配属ですが、まずは新規アポイント獲得のチームを想定していますが、問題なさそうでしょうか？' },
      { time: '28:00', speaker: '応募者', text: 'はい、前職のアウトバウンドの経験が最も活かせる領域ですので、ぜひチームに貢献したいです。' },
      { time: '35:00', speaker: '面接官', text: 'ご事情があったのですね、わかりました！ではこれで面接を終了します。ありがとうございました！' }
    ]
  }
};

let HISTORY_DATA = [];
let VIDEOS_DATA = [];
let firebaseDb = null;

function saveStateToLocalStorage() {
  try {
    localStorage.setItem('interview_history_data', JSON.stringify(HISTORY_DATA));
    localStorage.setItem('interview_videos_data', JSON.stringify(VIDEOS_DATA));
    // Save only custom feedbacks (that were added dynamically by user and don't have isMock=true)
    const customFeedbacks = {};
    for (const k in MOCK_FEEDBACKS) {
      if (MOCK_FEEDBACKS[k] && !MOCK_FEEDBACKS[k].isMock) {
        customFeedbacks[k] = MOCK_FEEDBACKS[k];
      }
    }
    localStorage.setItem('interview_custom_feedbacks', JSON.stringify(customFeedbacks));

    if (firebaseDb) {
      // Save videos to collection "videos"
      VIDEOS_DATA.forEach(v => {
        const docData = { ...v };
        delete docData.fileObject;
        firebaseDb.collection("videos").doc(v.key).set(docData)
          .catch(err => console.error("Error saving video doc:", err));
      });
      // Save custom feedbacks to collection "feedbacks"
      for (const k in customFeedbacks) {
        if (customFeedbacks[k]) {
          firebaseDb.collection("feedbacks").doc(k).set(customFeedbacks[k])
            .catch(err => console.error("Error saving feedback doc:", err));
        }
      }
    }
  } catch (e) {
    console.error("Failed to save state:", e);
  }
}

function setupFirestoreRealtimeSync() {
  if (!firebaseDb) return;
  
  const firebaseStatus = document.getElementById('firebase-status');
  const globalSyncBadge = document.getElementById('global-sync-badge');
  
  if (firebaseStatus) {
    firebaseStatus.textContent = '接続完了（クラウド同期中）';
    firebaseStatus.className = 'status-badge done';
  }
  if (globalSyncBadge) {
    globalSyncBadge.textContent = '🟢 クラウド同期中';
    globalSyncBadge.className = 'status-badge done';
  }
  
  // Real-time listener for videos
  firebaseDb.collection("videos").onSnapshot(snapshot => {
    let loadedVideos = [];
    snapshot.forEach(doc => {
      loadedVideos.push(doc.data());
    });
    
    if (loadedVideos.length > 0) {
      // Preserve local fileObjects in memory
      loadedVideos.forEach(lv => {
        const existing = VIDEOS_DATA.find(v => v.key === lv.key);
        if (existing && existing.fileObject) {
          lv.fileObject = existing.fileObject;
        }
      });

      const PRESET_VIDEOS = [
        { key: 'sato', name: '佐藤面接官_0417.mp4', date: '2026/04/17', duration: '30分', size: '268 MB', status: 'pending', grade: '—', score: null, isNew: true, hidden: true, group: '新卒採用チーム' },
        { key: 'takahashi', name: '高橋面接官_0417.mp4', date: '2026/04/17', duration: '27分', size: '231 MB', status: 'pending', grade: '—', score: null, isNew: true, hidden: true, group: '中途開発チーム' },
        { key: 'ito', name: '伊藤面接官_0416.mp4', date: '2026/04/16', duration: '35分', size: '312 MB', status: 'pending', grade: '—', score: null, isNew: true, hidden: true, group: '新卒採用チーム' }
      ];
      
      const presetsToAppend = PRESET_VIDEOS.filter(p => !loadedVideos.some(lv => lv.key === p.key));
      VIDEOS_DATA = [...loadedVideos, ...presetsToAppend];
    } else {
      // If Firestore is connected but empty, use presets
      VIDEOS_DATA = [
        { key: 'sato', name: '佐藤面接官_0417.mp4', date: '2026/04/17', duration: '30分', size: '268 MB', status: 'pending', grade: '—', score: null, isNew: true, hidden: true, group: '新卒採用チーム' },
        { key: 'takahashi', name: '高橋面接官_0417.mp4', date: '2026/04/17', duration: '27分', size: '231 MB', status: 'pending', grade: '—', score: null, isNew: true, hidden: true, group: '中途開発チーム' },
        { key: 'ito', name: '伊藤面接官_0416.mp4', date: '2026/04/16', duration: '35分', size: '312 MB', status: 'pending', grade: '—', score: null, isNew: true, hidden: true, group: '新卒採用チーム' }
      ];
    }
    
    // Rebuild HISTORY_DATA
    HISTORY_DATA = VIDEOS_DATA.filter(v => v.status === 'done').map(v => ({
      key: v.key,
      date: v.date,
      name: extractCandidateName(v.name) + '面接官',
      score: v.score,
      grade: v.grade,
      group: v.group
    }));
    HISTORY_DATA.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Re-render UI components dynamically
    updateGroupDropdowns();
    if (document.getElementById('trendChart')) initTrendChart();
    if (document.getElementById('historyChart')) initHistoryChart();
    if (document.getElementById('gradeDistChart')) initGradeDistChart();
    renderHistoryList();
    renderVideosTable();
    updateDashboardMetrics();
  }, err => {
    console.error("Firestore videos snapshot error:", err);
  });
  
  // Real-time listener for feedbacks
  firebaseDb.collection("feedbacks").onSnapshot(snapshot => {
    let loadedFeedbacks = {};
    snapshot.forEach(doc => {
      loadedFeedbacks[doc.id] = doc.data();
    });
    Object.assign(MOCK_FEEDBACKS, loadedFeedbacks);
  }, err => {
    console.error("Firestore feedbacks snapshot error:", err);
  });
}

// ===== Navigation =====
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const nav = document.getElementById('nav-' + page);
  if (nav) nav.classList.add('active');
}

document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.addEventListener('click', () => navigateTo(item.dataset.page));
});

// ===== Show Feedback Page =====
function showFeedbackPage(key) {
  const fb = MOCK_FEEDBACKS[key];
  if (!fb) return;
  
  // Show or hide simulation warning banner
  const warningEl = document.getElementById('fb-simulation-warning');
  if (warningEl) {
    if (fb.isMock) {
      warningEl.style.display = 'flex';
    } else {
      warningEl.style.display = 'none';
    }
  }

  document.getElementById('fbTitle').textContent = fb.title;
  document.getElementById('fbSubtitle').textContent = fb.subtitle;
  document.getElementById('fbTotalScore').textContent = fb.total;
  const gradeEl = document.getElementById('fbGrade');
  gradeEl.textContent = fb.grade;
  const gradeColors = { A:'var(--accent-green)', B:'var(--accent-blue)', C:'var(--accent-orange)', D:'var(--accent-red)' };
  gradeEl.style.color = gradeColors[fb.grade];
  document.getElementById('fbGradeLabel').textContent = fb.gradeLabel;

  // Score bars
  const barsHtml = CRITERIA.map(c => {
    const s = fb.scores[c.key];
    const pct = (s / 5) * 100;
    return `<div class="score-bar-container"><div class="score-bar-header"><span class="score-bar-label">${c.icon} ${c.name}</span><span class="score-bar-value">${s} / 5</span></div><div class="score-bar-track"><div class="score-bar-fill" style="width:0%" data-target="${pct}"></div></div></div>`;
  }).join('');
  document.getElementById('scoreBars').innerHTML = barsHtml;

  // Animate bars
  setTimeout(() => {
    document.querySelectorAll('.score-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 100);

  // Strengths
  document.getElementById('fbStrengths').innerHTML = fb.strengths.map(s =>
    `<div class="insight-card strength"><div class="insight-icon">✅</div><div class="insight-text">${s}</div></div>`
  ).join('');

  // Improvements
  document.getElementById('fbImprovements').innerHTML = fb.improvements.map(s =>
    `<div class="insight-card improvement"><div class="insight-icon">💡</div><div class="insight-text">${s}</div></div>`
  ).join('');

  // Criteria detail
  document.getElementById('fbCriteriaDetail').innerHTML = CRITERIA.map(c => {
    const d = fb.details[c.key];
    const tsHtml = d.timestamps.length ? d.timestamps.map(t => `<span class="feedback-timestamp">📍 ${t}</span>`).join(' ') : '';
    return `<div class="feedback-item"><div class="feedback-item-header"><div class="feedback-item-title">${c.icon} ${c.name}</div><div class="feedback-item-score" style="color:${d.score>=4?'var(--accent-green)':d.score>=3?'var(--accent-blue)':'var(--accent-orange)'}">${d.score}/5</div></div><div class="feedback-item-comment">${d.comment}</div>${tsHtml?'<div class="mt-12">'+tsHtml+'</div>':''}</div>`;
  }).join('');

  // Overall comment
  document.getElementById('fbOverallComment').textContent = fb.overall;

  // Render dialogue bubbles for transcription
  const transcriptionEl = document.getElementById('fbTranscription');
  if (transcriptionEl) {
    if (Array.isArray(fb.transcription) && fb.transcription.length > 0) {
      transcriptionEl.innerHTML = fb.transcription.map(t => {
        const isInterviewer = t.speaker === '面接官';
        const speakerColor = isInterviewer ? 'rgba(34, 211, 238, 0.08)' : 'rgba(52, 211, 153, 0.08)';
        const borderColor = isInterviewer ? 'var(--accent-cyan)' : 'var(--accent-green)';
        const nameColor = isInterviewer ? 'var(--accent-cyan)' : 'var(--accent-green)';
        return `
          <div class="script-bubble-row" style="display: flex; align-items: flex-start; margin-bottom: 12px; gap: 12px;">
            <div style="font-size: 11px; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-family: monospace; align-self: flex-start; margin-top: 4px; min-width: 45px; text-align: center;">
              ${t.time}
            </div>
            <div class="script-bubble" style="flex: 1; padding: 10px 14px; border-radius: 8px; background: ${speakerColor}; border-left: 4px solid ${borderColor};">
              <div style="font-weight: bold; font-size: 11px; margin-bottom: 2px; color: ${nameColor}; display: flex; align-items: center; gap: 4px;">
                <span>${isInterviewer ? '👤' : '💬'}</span>
                <span>${t.speaker}</span>
              </div>
              <div style="font-size: 13px; line-height: 1.5; color: var(--text-primary); white-space: pre-wrap;">${t.text}</div>
            </div>
          </div>
        `;
      }).join('');
    } else {
      transcriptionEl.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px; font-size: 13px;">文字起こしデータはありません。</div>`;
    }
  }

  // Radar chart
  renderRadarChart(fb.scores);
  navigateTo('feedback');
}

// ===== Charts =====
let trendChartInstance, radarChartInstance, historyChartInstance, gradeDistChartInstance;

function initTrendChart() {
  const ctx = document.getElementById('trendChart').getContext('2d');
  if (trendChartInstance) trendChartInstance.destroy();

  // Limit to latest 10 entries for clean visualization
  const recentHistory = HISTORY_DATA.slice(0, 10).reverse();

  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: recentHistory.map(h => h.date.slice(5)),
      datasets: [{
        label: '総合スコア',
        data: recentHistory.map(h => h.score),
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34,211,238,0.1)',
        fill: true, tension: 0.4, pointRadius: 5,
        pointBackgroundColor: '#22d3ee', pointBorderColor: '#0a0e1a', pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        y: { min: 0, max: 15, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#5a6480', font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { color: '#5a6480', font: { size: 11 } } }
      },
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#1a2140', titleColor: '#e8ecf4', bodyColor: '#8b95b0', borderColor: '#2a3660', borderWidth: 1 }
      }
    }
  });
}

function renderRadarChart(scores) {
  const ctx = document.getElementById('radarChart').getContext('2d');
  if (radarChartInstance) radarChartInstance.destroy();
  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: CRITERIA.map(c => c.name),
      datasets: [{
        data: CRITERIA.map(c => scores[c.key]),
        backgroundColor: 'rgba(34,211,238,0.15)',
        borderColor: '#22d3ee', borderWidth: 2,
        pointBackgroundColor: '#22d3ee', pointRadius: 5, pointBorderColor: '#0a0e1a', pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      scales: {
        r: {
          min: 0, max: 5,
          ticks: { stepSize: 1, color: '#5a6480', backdropColor: 'transparent', font: { size: 10 } },
          grid: { color: 'rgba(255,255,255,0.08)' },
          angleLines: { color: 'rgba(255,255,255,0.08)' },
          pointLabels: { color: '#8b95b0', font: { size: 11, family: "'Inter','Noto Sans JP',sans-serif" } }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function initHistoryChart() {
  const ctx = document.getElementById('historyChart').getContext('2d');
  if (historyChartInstance) historyChartInstance.destroy();

  // Limit to latest 10 entries for bar chart as well
  const recentHistory = HISTORY_DATA.slice(0, 10).reverse();

  historyChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: recentHistory.map(h => h.name),
      datasets: [{
        label: 'スコア',
        data: recentHistory.map(h => h.score),
        backgroundColor: recentHistory.map(h => {
          const colors = { A:'rgba(52,211,153,0.6)', B:'rgba(59,130,246,0.6)', C:'rgba(245,158,11,0.6)', D:'rgba(239,68,68,0.6)' };
          return colors[h.grade];
        }),
        borderRadius: 6, borderSkipped: false
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        y: { min: 0, max: 15, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#5a6480' } },
        x: { grid: { display: false }, ticks: { color: '#5a6480', font: { size: 10 } } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function initGradeDistChart() {
  const ctx = document.getElementById('gradeDistChart').getContext('2d');
  if (gradeDistChartInstance) gradeDistChartInstance.destroy();

  // Calculate grade distribution dynamically from HISTORY_DATA
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  HISTORY_DATA.forEach(h => {
    if (counts[h.grade] !== undefined) {
      counts[h.grade]++;
    }
  });

  gradeDistChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['A（模範的）','B（良好）','C（改善要）','D（要トレーニング）'],
      datasets: [{
        data: [counts.A, counts.B, counts.C, counts.D],
        backgroundColor: ['#34d399','#3b82f6','#f59e0b','#ef4444'],
        borderWidth: 0,
        spacing: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#8b95b0', font: { size: 11 }, padding: 12, usePointStyle: true, pointStyleWidth: 8 } }
      }
    }
  });
}

// ===== History List =====
function renderHistoryList() {
  const el = document.getElementById('historyList');
  el.innerHTML = HISTORY_DATA.map(h => {
    const video = VIDEOS_DATA.find(v => v.key === h.key) || VIDEOS_DATA.find(v => {
      const vName = extractCandidateName(v.name) + '面接官';
      return vName === h.name;
    });
    const key = video ? video.key : null;
    const click = key ? ` onclick="showFeedbackPage('${key}')"` : '';
    const gradeColors = { A:'var(--accent-green)', B:'var(--accent-blue)', C:'var(--accent-orange)', D:'var(--accent-red)' };
    return `<div class="history-item"${click}><div class="history-date">${h.date}</div><div class="grade-badge ${h.grade}" style="width:30px;height:30px;font-size:13px;">${h.grade}</div><div class="history-name">${h.name}</div><div class="history-score" style="color:${gradeColors[h.grade]}">${h.score}/15</div></div>`;
  }).join('');
}

// ===== Settings Criteria =====
function renderCriteriaSettings() {
  const el = document.getElementById('criteriaSettings');
  el.innerHTML = CRITERIA.map(c =>
    `<div class="feedback-item"><div class="feedback-item-header"><div class="feedback-item-title">${c.icon} ${c.name}</div><div class="text-sm text-muted">配点: 1〜5</div></div><div style="margin-top:8px"><input type="text" value="${c.name}" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid var(--border);background:var(--bg-primary);color:var(--text-primary);font-size:13px;"></div></div>`
  ).join('');
}

// ===== Simulate Scan =====
function simulateScan() {
  showToast('🔍', 'Google Driveをスキャンしています...');
  setTimeout(() => {
    VIDEOS_DATA.forEach(v => {
      if (v.key === 'sato' || v.key === 'takahashi' || v.key === 'ito') {
        v.hidden = false;
      }
    });
    updateGroupDropdowns();
    renderVideosTable();
    updateDashboardMetrics();
    showToast('✅', '3件の新規録画を検出しました！');
    
    saveStateToLocalStorage();
    
    // Update badge on sidebar nav-videos if present
    const badge = document.querySelector('#nav-videos .badge');
    if (badge) {
      const pendingCount = VIDEOS_DATA.filter(v => v.status === 'pending' && !v.hidden).length;
      badge.textContent = pendingCount.toString();
    }
    
    navigateTo('videos');
  }, 2000);
}

// ===== Simulate Single Analysis =====
function simulateAnalyzeSingle(btn) {
  const row = btn.closest('tr');
  const key = row.dataset.key;
  const video = VIDEOS_DATA.find(v => v.key === key);
  if (!video) return;

  // Navigate to Agent page
  navigateTo('agent');

  // Reset pipeline if already completed/running to make sure it runs fresh
  if (pipelineCompleted || pipelineRunning) {
    resetAgentPipeline();
  }

  // Pre-select the file on the Agent page
  if (video.fileObject) {
    // If it's a custom file, set it as the imported file
    handleFileSelect(video.fileObject);
  } else {
    // If it's a preset candidate (e.g. sato, takahashi, ito), select it in the preset select dropdown
    selectPresetVideo(key);
    const selectEl = document.getElementById('agent-video-select');
    if (selectEl) selectEl.value = key;
  }

  // Automatically start the pipeline after a short delay for smooth transition
  setTimeout(() => {
    startAgentPipeline();
  }, 500);
}

function simulateAnalyzeAll() {
  const pendingVideos = VIDEOS_DATA.filter(v => v.status === 'pending' && !v.hidden);
  if (pendingVideos.length === 0) {
    showToast('📝', '分析待ちの動画はありません');
    return;
  }
  
  showToast('🤖', '未分析の全録画を一括分析しています...');
  
  // Set all to processing
  pendingVideos.forEach(v => {
    v.status = 'processing';
  });
  renderVideosTable();
  updateDashboardMetrics();
  
  pendingVideos.forEach((video, i) => {
    setTimeout(() => {
      const grades = ['A', 'B', 'B'];
      const scores = [13, 11, 10];
      const idx = i % 3;
      
      video.status = 'done';
      video.grade = grades[idx];
      video.score = scores[idx];
      video.isNew = false;
      
      const key = video.key;
      // Check if mock feedback exists for this key. If not, create a placeholder using the name.
      if (!MOCK_FEEDBACKS[key]) {
        const candidateName = extractCandidateName(video.name);
        const templateKeys = ['tanaka', 'suzuki', 'yamada'];
        const randTemplate = templateKeys[Math.floor(Math.random() * templateKeys.length)];
        const rawTemplate = MOCK_FEEDBACKS[randTemplate];
        const oldName = randTemplate === 'tanaka' ? '田中' : randTemplate === 'suzuki' ? '鈴木' : '山田';
        MOCK_FEEDBACKS[key] = replaceNameInObject(rawTemplate, oldName, candidateName);
        MOCK_FEEDBACKS[key].title = video.name;
        MOCK_FEEDBACKS[key].subtitle = `${video.date} ・ ${video.duration} ・ ${video.size}`;
        MOCK_FEEDBACKS[key].total = scores[idx];
        MOCK_FEEDBACKS[key].grade = grades[idx];
        MOCK_FEEDBACKS[key].gradeLabel = getGradeFromScore(scores[idx]).label;
      } else {
        MOCK_FEEDBACKS[key].total = scores[idx];
        MOCK_FEEDBACKS[key].grade = grades[idx];
        MOCK_FEEDBACKS[key].gradeLabel = getGradeFromScore(scores[idx]).label;
      }

      // Add to HISTORY_DATA if not already there
      const baseTitle = extractCandidateName(video.name) + '面接官';
      const historyItem = HISTORY_DATA.find(h => h.key === key);
      if (historyItem) {
        historyItem.score = video.score;
        historyItem.grade = video.grade;
        historyItem.group = video.group;
      } else {
        HISTORY_DATA.unshift({
          key: key,
          date: video.date,
          name: baseTitle,
          score: video.score,
          grade: video.grade,
          group: video.group
        });
      }
      
      updateGroupDropdowns();
      renderVideosTable();
      updateDashboardMetrics();
      renderHistoryList();
      
      // Update charts
      if (trendChartInstance) {
        trendChartInstance.data.labels = HISTORY_DATA.map(h => h.date.slice(5) || h.date).reverse();
        trendChartInstance.data.datasets[0].data = HISTORY_DATA.map(h => h.score).reverse();
        trendChartInstance.update();
      }
      if (historyChartInstance) {
        historyChartInstance.data.labels = HISTORY_DATA.map(h => h.name).reverse();
        historyChartInstance.data.datasets[0].data = HISTORY_DATA.map(h => h.score).reverse();
        historyChartInstance.data.datasets[0].backgroundColor = HISTORY_DATA.map(h => {
          const colors = { A:'rgba(52,211,153,0.6)', B:'rgba(59,130,246,0.6)', C:'rgba(245,158,11,0.6)', D:'rgba(239,68,68,0.6)' };
          return colors[h.grade];
        }).reverse();
        historyChartInstance.update();
      }
      if (gradeDistChartInstance) {
        const counts = { A: 0, B: 0, C: 0, D: 0 };
        HISTORY_DATA.forEach(h => {
          if (counts[h.grade] !== undefined) counts[h.grade]++;
        });
        gradeDistChartInstance.data.datasets[0].data = [counts.A, counts.B, counts.C, counts.D];
        gradeDistChartInstance.update();
      }

      // Update nav badge count
      const badge = document.querySelector('#nav-videos .badge');
      if (badge) {
        const pendingCount = VIDEOS_DATA.filter(v => v.status === 'pending' && !v.hidden).length;
        badge.textContent = pendingCount.toString();
      }
      
      showToast('✅', video.name + ' の分析が完了しました');
    }, (i + 1) * 2000);
  });
}

// ===== Toast =====
function showToast(icon, msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== Agent Pipeline State =====
let importedFile = null;
let selectedPresetKey = null;
let pipelineRunning = false;
let pipelineCompleted = false;
let pipelineStepIndex = 1;
let uploadedFileMeta = null;
let parsedResult = null;
let currentTranscription = null;

const nodes = [
  { id: 1, name: 'Drive Trigger', arrowId: 'arrow-1' },
  { id: 2, name: 'Audio Extractor', arrowId: 'arrow-2' },
  { id: 3, name: 'Gemini Uploader', arrowId: 'arrow-3' },
  { id: 4, name: 'Gemini Transcriber', arrowId: 'arrow-4' },
  { id: 5, name: 'Gemini Evaluator', arrowId: 'arrow-5' },
  { id: 6, name: 'Data Transformer', arrowId: 'arrow-6' },
  { id: 7, name: 'Output Connector', arrowId: null }
];

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function extractCandidateName(filename) {
  const base = filename.replace(/\.[^/.]+$/, "");
  const nameMatch = base.match(/^([^_]+)面接官/) || base.match(/^([^_]+)_面接官/) || base.match(/^([^_]+)面接/) || base.match(/^([^_]+)_面接/) || base.match(/^([^_]+)/);
  return nameMatch ? nameMatch[1] : base;
}

function replaceNameInObject(obj, oldName, newName) {
  if (typeof obj === 'string') {
    return obj.replaceAll(oldName, newName);
  }
  if (Array.isArray(obj)) {
    return obj.map(item => replaceNameInObject(item, oldName, newName));
  }
  if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = replaceNameInObject(obj[key], oldName, newName);
    }
    return newObj;
  }
  return obj;
}

function getGradeFromScore(total) {
  if (total >= 13) return { grade: 'A', label: '模範的な面接対応' };
  if (total >= 10) return { grade: 'B', label: '良好、標準的' };
  if (total >= 7) return { grade: 'C', label: '一部改善が必要' };
  return { grade: 'D', label: '要トレーニング・指導' };
}

function logToConsole(type, message) {
  const consoleBox = document.getElementById('agent-console');
  if (!consoleBox) return;
  const line = document.createElement('div');
  line.className = `console-line ${type}`;
  line.textContent = message;
  consoleBox.appendChild(line);
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

function clearConsole() {
  const consoleBox = document.getElementById('agent-console');
  if (consoleBox) {
    consoleBox.innerHTML = '';
    logToConsole('system', '[SYSTEM] コンソールログがクリアされました。');
  }
}

function switchPreviewTab(tabName) {
  document.querySelectorAll('.tabs .tab').forEach(tab => {
    tab.classList.remove('active');
  });
  const activeTab = document.getElementById(`tab-${tabName}`);
  if (activeTab) activeTab.classList.add('active');
  
  document.querySelectorAll('.preview-content').forEach(content => {
    content.style.display = 'none';
    content.classList.remove('active');
  });
  const activeContent = document.getElementById(`preview-${tabName}`);
  if (activeContent) {
    activeContent.style.display = 'block';
    activeContent.classList.add('active');
  }
}

function handleFileSelect(file) {
  importedFile = file;
  selectedPresetKey = null;
  
  const videoSelect = document.getElementById('agent-video-select');
  if (videoSelect) videoSelect.value = "";
  
  const fileInfo = document.getElementById('imported-file-info');
  const infoFileName = document.getElementById('info-file-name');
  const infoFileSize = document.getElementById('info-file-size');
  const dropzone = document.getElementById('import-dropzone');
  const btnRun = document.getElementById('btn-run-pipeline');
  const btnReset = document.getElementById('btn-reset-pipeline');
  
  if (infoFileName) infoFileName.textContent = file.name;
  if (infoFileSize) infoFileSize.textContent = formatBytes(file.size);
  if (fileInfo) fileInfo.style.display = 'block';
  if (dropzone) dropzone.style.display = 'none';
  
  if (btnRun) btnRun.disabled = false;
  if (btnReset) btnReset.disabled = false;
  
  logToConsole('system', `[SYSTEM] ファイル "${file.name}" がインポートされました。サイズ: ${formatBytes(file.size)}`);
}

function clearImportedFile() {
  if (pipelineRunning) return;
  importedFile = null;
  selectedPresetKey = null;
  
  const fileInput = document.getElementById('agent-file-input');
  const videoSelect = document.getElementById('agent-video-select');
  const fileInfo = document.getElementById('imported-file-info');
  const dropzone = document.getElementById('import-dropzone');
  const btnRun = document.getElementById('btn-run-pipeline');
  const btnReset = document.getElementById('btn-reset-pipeline');
  
  if (fileInput) fileInput.value = "";
  if (videoSelect) videoSelect.value = "";
  if (fileInfo) fileInfo.style.display = 'none';
  if (dropzone) dropzone.style.display = 'block';
  
  const groupInput = document.getElementById('agent-group-input');
  if (groupInput) groupInput.value = "";
  
  if (btnRun) btnRun.disabled = true;
  if (!pipelineCompleted && btnReset) btnReset.disabled = true;
  
  logToConsole('system', '[SYSTEM] インポートされたファイルがクリアされました。');
}

function selectPresetVideo(value) {
  if (pipelineRunning || pipelineCompleted) return;
  selectedPresetKey = value;
  importedFile = null;
  
  const fileInput = document.getElementById('agent-file-input');
  const fileInfo = document.getElementById('imported-file-info');
  const infoFileName = document.getElementById('info-file-name');
  const infoFileSize = document.getElementById('info-file-size');
  const dropzone = document.getElementById('import-dropzone');
  const btnRun = document.getElementById('btn-run-pipeline');
  const btnReset = document.getElementById('btn-reset-pipeline');
  
  if (fileInput) fileInput.value = "";
  
  const videoPreset = VIDEOS_DATA.find(v => v.key === value);
  if (videoPreset) {
    if (infoFileName) infoFileName.textContent = videoPreset.name;
    if (infoFileSize) infoFileSize.textContent = videoPreset.size;
    if (fileInfo) fileInfo.style.display = 'block';
    if (dropzone) dropzone.style.display = 'none';
    if (btnRun) btnRun.disabled = false;
    if (btnReset) btnReset.disabled = false;
    
    const groupInput = document.getElementById('agent-group-input');
    if (groupInput) {
      groupInput.value = videoPreset.group || '';
    }
    
    logToConsole('system', `[SYSTEM] プリセット動画 "${videoPreset.name}" が選択されました。サイズ: ${videoPreset.size}`);
  }
}

async function uploadFileToGemini(file, apiKey) {
  logToConsole('cmd', `> curl -X POST "https://generativelanguage.googleapis.com/upload/v1beta/files?key=..." \\`);
  logToConsole('cmd', `    -H "X-Goog-Upload-Protocol: resumable" \\`);
  logToConsole('cmd', `    -H "X-Goog-Upload-Command: start" \\`);
  logToConsole('cmd', `    -H "X-Goog-Upload-Header-Content-Length: ${file.size}" \\`);
  logToConsole('cmd', `    -H "X-Goog-Upload-Header-Content-Type: ${file.type}"`);

  const initUrl = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${apiKey}`;
  const initResponse = await fetch(initUrl, {
    method: 'POST',
    headers: {
      'X-Goog-Upload-Protocol': 'resumable',
      'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': file.size.toString(),
      'X-Goog-Upload-Header-Content-Type': file.type || 'application/octet-stream',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      file: {
        display_name: file.name
      }
    })
  });

  if (!initResponse.ok) {
    const errorText = await initResponse.text();
    throw new Error(`Upload initialization failed: ${errorText}`);
  }

  const uploadUrl = initResponse.headers.get('X-Goog-Upload-URL');
  if (!uploadUrl) {
    throw new Error('Failed to retrieve X-Goog-Upload-URL from response headers.');
  }

  logToConsole('info', `[INFO] アップロードセッション初期化成功。`);
  logToConsole('info', `[INFO] ファイルのアップロードを開始します (${formatBytes(file.size)})...`);

  const uploadResponse = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'X-Goog-Upload-Offset': '0',
      'X-Goog-Upload-Command': 'upload, finalize'
    },
    body: file
  });

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  const fileMetadata = await uploadResponse.json();
  logToConsole('success', `[SUCCESS] アップロード完了。File Name: ${fileMetadata.file.name}`);
  return fileMetadata.file;
}

async function pollFileStatus(fileMetadata, apiKey) {
  const fileId = fileMetadata.name;
  const checkUrl = `https://generativelanguage.googleapis.com/v1beta/${fileId}?key=${apiKey}`;
  
  logToConsole('info', `[INFO] Gemini Files APIでのファイル処理状態を確認しています...`);
  
  // 180回 * 2.5秒 = 450秒（最大7.5分）待機し、大容量ビデオファイルの処理に対応
  for (let i = 0; i < 180; i++) {
    const response = await fetch(checkUrl);
    if (!response.ok) {
      throw new Error(`Failed to check file status: ${await response.text()}`);
    }
    
    const status = await response.json();
    const elapsedSeconds = ((i + 1) * 2.5).toFixed(0);
    logToConsole('system', `[SYSTEM] ファイル処理中... 状態: ${status.state} (経過時間: ${elapsedSeconds}秒)`);
    
    if (status.state === 'ACTIVE') {
      logToConsole('success', `[SUCCESS] ファイルがアクティブになりました。URI: ${status.uri}`);
      return status;
    } else if (status.state === 'FAILED') {
      throw new Error('Gemini Files API file processing failed.');
    }
    
    await new Promise(resolve => setTimeout(resolve, 2500));
  }
  
  throw new Error('Timeout waiting for file to become ACTIVE in Gemini Files API. (ファイル処理タイムアウト。容量が大きすぎる場合は、音声のみの.mp3等に変換して再試行してください)');
}

async function transcribeInterviewWithGemini(fileUri, mimeType, apiKey, modelName) {
  logToConsole('info', `[INFO] 【文字起こし】音声データから話者分離付きの文字起こしを生成中 (使用モデル: ${modelName})...`);
  logToConsole('cmd', `> curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=..." \\`);
  logToConsole('cmd', `    -H "Content-Type: application/json" \\`);
  logToConsole('cmd', `    -d '{"contents": [{"parts": [{"file_data": {"file_uri": "${fileUri}", "mime_type": "${mimeType}"}}, {"text": "文字起こしプロンプト"}]}]}'`);

  const transcriptionPrompt = `あなたはプロの高精度日本語文字起こし・話者分離システムです。
入力された音声ファイルを最初から最後まで注意深く聞き取り、会話内容を一言一句漏らさず時系列で書き起こしてください。

【タスク内容】
1. 話者分離（ダイアライゼーション）：
   発言者を「面接官」と「応募者」の2名に識別・分離してください。
2. タイムスタンプ付与：
   各発言の開始時刻を「[分:秒]」形式（30分以上の場合は「[時間:分:秒]」も可）で秒単位で正確に記録してください。
3. 逐語起こし（ケバ取り対応）：
   「あー」「えっと」などの不要なフィラーは除外して構いませんが、それ以外の意味を持つすべての発言は絶対に省略（「中略」「以下同様」など）せず、日本語として正確に記述してください。

【重要なルール（ハルシネーション・要約の防止）】
- 音声内で実際に語られていない単語や、勝手な推測・創作（ハルシネーション）を絶対に含めないでください。
- 絶対に要約しないでください。特に面接の2分〜7分の間を含め、すべての発言を一言一句漏らさずテキスト化してください。
- 評価やスコアリング、前置き、まとめの挨拶など、文字起こし以外のテキストは一切出力しないでください。

【出力フォーマット】
以下の形式で、1行に1つの発言を出力してください。余計な空行や記号は含めないでください。
[分:秒] 話者: 発言内容

【出力例】
[00:03] 面接官: 本日はお時間をいただきありがとうございます。
[00:07] 応募者: よろしくお願いいたします。
[00:10] 面接官: 緊張されていますか？
[00:12] 応募者: はい、少し緊張しています。`;

  const transcriptionRequestBody = {
    contents: [
      {
        parts: [
          {
            file_data: {
              mime_type: mimeType,
              file_uri: fileUri
            }
          },
          {
            text: transcriptionPrompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.0 // 決定論的な出力を強制し、ハルシネーションと要約を防ぐ
    }
  };

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transcriptionRequestBody)
  });

  if (!response.ok) {
    throw new Error(`Gemini transcription call failed: ${await response.text()}`);
  }

  const json = await response.json();
  const rawText = json.candidates[0].content.parts[0].text;
  
  // Parse plain text transcription to array of objects
  let cleanText = rawText.trim();
  if (cleanText.startsWith('```')) {
    const lines = cleanText.split('\n');
    if (lines[0].startsWith('```')) {
      lines.shift();
    }
    if (lines[lines.length - 1] === '```') {
      lines.pop();
    }
    cleanText = lines.join('\n');
  }

  const lines = cleanText.split('\n');
  const transcription = [];
  const lineRegex = /^\[(\d{1,2}:\d{2}(?::\d{2})?)\]\s*(面接官|応募者|Interviewer|Applicant)\s*:\s*(.*)$/;
  for (const line of lines) {
    const match = line.trim().match(lineRegex);
    if (match) {
      let speaker = match[2].trim();
      if (speaker === 'Interviewer') speaker = '面接官';
      if (speaker === 'Applicant') speaker = '応募者';
      transcription.push({
        time: match[1],
        speaker: speaker,
        text: match[3].trim()
      });
    }
  }

  if (transcription.length === 0) {
    logToConsole('error', `[WARNING] 文字起こしの解析に失敗したため、テキスト行としてフォールバックします。`);
    lines.forEach((line, idx) => {
      if (line.trim()) {
        transcription.push({
          time: '00:00',
          speaker: '面接官',
          text: line.trim()
        });
      }
    });
  }

  logToConsole('success', `[SUCCESS] 【第1段階完了】高精度文字起こしデータを受信しました（発言数: ${transcription.length}）。`);
  return transcription;
}

async function evaluateTranscriptWithGemini(transcriptFormatted, apiKey, modelName) {
  logToConsole('info', `[INFO] 【評価＆スコアリング】生成された文字起こしテキストのみに基づいて評価を実行中 (使用モデル: ${modelName})...`);
  logToConsole('cmd', `> curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=..." \\`);
  logToConsole('cmd', `    -H "Content-Type: application/json" \\`);

  const evaluationPrompt = `あなたは企業の人事コンサルタント、および面接官トレーナーです。
提供された面接の文字起こしテキストのみを詳細に分析し、応募者ではなく【面接官（Interviewer）】のコミュニケーションスキルや質問の質を客観的に評価し、フィードバックを行ってください。
ハルシネーションを防ぐため、必ず提供された文字起こしテキストの具体的な発言や文脈のみに基づいて評価し、存在しない発言をでっち上げないでください。

# 提供された文字起こしテキスト:
${transcriptFormatted}

# 処理手順
1. 【面接官のスコアリング】: 以下の評価項目（1〜5点、5点満点）に基づき面接官を採点し、その点数をつけた明確な理由を、面接官の実際の発言や文脈に即して提示してください。
   - アイスブレイク・傾聴力: 冒頭で緊張をほぐせているか。応募者の発言に対して適切な相槌や共感を示し、話しやすい空気を作れているか。
   - 質問・深掘り力: 的確な問いを立てられているか。表面的な回答で終わらせず、エピソードの本質や行動特性を引き出すための「深掘り（なぜ？等）」ができているか。
   - アトラクト・構造化: 自社の魅力や今後の流れを構造化してわかりやすく説明できているか。また、面接官としての立ち振る舞いや言葉遣いが適切か。
2. 【面接官への定性フィードバック】: 面接官としての総評、優れたアドリブや対応だった点、および次回へ向けた具体的な改善アクションを記述してください。`;

  const evaluationRequestBody = {
    contents: [
      {
        parts: [
          {
            text: evaluationPrompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2, // 低温に設定して一貫した客観的評価を出力させる
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          evaluation: {
            type: "OBJECT",
            properties: {
              icebreak_listening: {
                type: "OBJECT",
                properties: {
                  score: { type: "INTEGER", description: "アイスブレイク・傾聴力のスコア (1-5)" },
                  reason: { type: "STRING", description: "具体的な評価理由" }
                },
                required: ["score", "reason"]
              },
              question_deepening: {
                type: "OBJECT",
                properties: {
                  score: { type: "INTEGER", description: "質問・深掘り力のスコア (1-5)" },
                  reason: { type: "STRING", description: "具体的な評価理由" }
                },
                required: ["score", "reason"]
              },
              attract_structure: {
                type: "OBJECT",
                properties: {
                  score: { type: "INTEGER", description: "アトラクト・構造化のスコア (1-5)" },
                  reason: { type: "STRING", description: "具体的な評価理由" }
                },
                required: ["score", "reason"]
              }
            },
            required: ["icebreak_listening", "question_deepening", "attract_structure"]
          },
          overall_feedback: { type: "STRING", description: "面接官に対する客観的なトレーナー目線の総評" },
          good_points: {
            type: "ARRAY",
            items: { type: "STRING" },
            description: "面接官の良かった点（2〜3件）"
          },
          improvement_points: {
            type: "ARRAY",
            items: { type: "STRING" },
            description: "面接官の改善点（2〜3件）"
          }
        },
        required: ["evaluation", "overall_feedback", "good_points", "improvement_points"]
      }
    }
  };

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(evaluationRequestBody)
  });

  if (!response.ok) {
    throw new Error(`Gemini evaluation call failed: ${await response.text()}`);
  }

  const json = await response.json();
  const rawEvalText = json.candidates[0].content.parts[0].text;
  const parsedEval = JSON.parse(rawEvalText);
  logToConsole('success', `[SUCCESS] 【第2段階完了】評価およびスコアリングのJSON結果を受信しました。`);
  return parsedEval;
}

let simulationForceProceed = false;

function goToSettingsFromModal() {
  const modal = document.getElementById('simulation-confirm-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 250);
  }
  navigateTo('settings');
}

function proceedWithSimulationFromModal() {
  const modal = document.getElementById('simulation-confirm-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 250);
  }
  simulationForceProceed = true;
  startAgentPipeline();
}

function startAgentPipeline() {
  if (pipelineRunning) return;
  
  if (!importedFile && !selectedPresetKey) {
    showToast('⚠️', 'ファイルを選択するか、プリセットを指定してください。');
    return;
  }
  
  const apiKeyInput = document.getElementById('settings-api-key');
  const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';

  // Check if trying to run a custom file without an API key
  if (importedFile && !apiKey && !simulationForceProceed) {
    const modal = document.getElementById('simulation-confirm-modal');
    if (modal) {
      modal.style.display = 'flex';
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
    }
    return;
  }

  // Reset the force proceed flag for subsequent runs
  simulationForceProceed = false;
  
  pipelineRunning = true;
  pipelineCompleted = false;
  
  const btnRun = document.getElementById('btn-run-pipeline');
  const btnReset = document.getElementById('btn-reset-pipeline');
  const videoSelect = document.getElementById('agent-video-select');
  
  if (btnRun) btnRun.disabled = true;
  if (btnReset) btnReset.disabled = true;
  if (videoSelect) videoSelect.disabled = true;
  
  const pipelineStatus = document.getElementById('pipeline-status');
  if (pipelineStatus) {
    pipelineStatus.textContent = '実行中...';
    pipelineStatus.className = 'status-badge processing';
  }
  
  nodes.forEach(n => {
    const nodeEl = document.getElementById(`node-${n.id}`);
    const statusEl = document.getElementById(`node-${n.id}-status`);
    if (nodeEl) nodeEl.className = 'pipeline-node';
    if (statusEl) {
      statusEl.textContent = '待機中';
      statusEl.className = 'node-status';
    }
    if (n.arrowId) {
      const arrowEl = document.getElementById(n.arrowId);
      if (arrowEl) arrowEl.className = 'pipeline-arrow';
    }
  });
  
  clearConsole();
  logToConsole('system', '[SYSTEM] パイプライン処理を開始します...');
  
  const speedRadio = document.querySelector('input[name="agent-speed"]:checked');
  const isFast = speedRadio ? speedRadio.value === 'fast' : false;
  
  pipelineStepIndex = 1;
  runPipelineStep(apiKey, isFast);
}

async function runPipelineStep(apiKey, isFast) {
  if (!pipelineRunning) return;
  
  const n = nodes.find(x => x.id === pipelineStepIndex);
  if (!n) {
    finishPipeline();
    return;
  }
  
  const nodeEl = document.getElementById(`node-${n.id}`);
  const statusEl = document.getElementById(`node-${n.id}-status`);
  if (nodeEl) nodeEl.classList.add('active');
  if (statusEl) {
    statusEl.textContent = '処理中';
  }
  
  if (pipelineStepIndex > 1) {
    const prevArrow = document.getElementById(`arrow-${pipelineStepIndex - 1}`);
    if (prevArrow) {
      prevArrow.className = 'pipeline-arrow active';
    }
  }
  
  let duration = 1000;
  
  try {
    if (pipelineStepIndex === 1) {
      duration = isFast ? 500 : 2000;
      logToConsole('cmd', '> python drive_trigger.py --folder_id 1AbCdEfGhIjKlMnOpQrStUvWxYz');
      logToConsole('info', '[INFO] Google Drive フォルダのスキャンを開始します...');
      
      const fileName = importedFile ? importedFile.name : (MOCK_FEEDBACKS[selectedPresetKey] ? MOCK_FEEDBACKS[selectedPresetKey].title : "不明なファイル");
      const fileSize = importedFile ? formatBytes(importedFile.size) : (MOCK_FEEDBACKS[selectedPresetKey] && MOCK_FEEDBACKS[selectedPresetKey].subtitle ? MOCK_FEEDBACKS[selectedPresetKey].subtitle.split(' ・ ')[2] : "—");
      
      setTimeout(() => {
        logToConsole('success', `[SUCCESS] 新しいファイルを検出しました: ${fileName} (サイズ: ${fileSize})`);
        logToConsole('info', '[INFO] パイプラインを起動します...');
        advancePipeline(apiKey, isFast);
      }, duration);
      
    } else if (pipelineStepIndex === 2) {
      duration = isFast ? 600 : 3000;
      const srcName = importedFile ? importedFile.name : (MOCK_FEEDBACKS[selectedPresetKey] ? MOCK_FEEDBACKS[selectedPresetKey].title : "不明なファイル");
      const destName = srcName.replace(/\.[^/.]+$/, "") + '.mp3';
      
      logToConsole('cmd', `> ffmpeg -i "${srcName}" -q:a 0 -map a "${destName}" -y`);
      logToConsole('info', `[INFO] 音声抽出処理を開始します: ${srcName} -> ${destName}`);
      
      if (!isFast) {
        setTimeout(() => logToConsole('system', 'ffmpeg output: size=  4096kB time=00:04:12.15 bitrate= 128.0kbits/s speed=35.1x'), 700);
        setTimeout(() => logToConsole('system', 'ffmpeg output: size= 11264kB time=00:13:45.33 bitrate= 128.0kbits/s speed=38.4x'), 1400);
        setTimeout(() => logToConsole('system', 'ffmpeg output: size= 21504kB time=00:27:12.00 bitrate= 128.0kbits/s speed=42.1x'), 2100);
      }
      
      setTimeout(() => {
        const mp3Size = importedFile ? formatBytes(importedFile.size * 0.09) : formatBytes(25 * 1024 * 1024);
        logToConsole('success', `[SUCCESS] 音声抽出完了: ${destName} (サイズ: ${mp3Size})`);
        advancePipeline(apiKey, isFast);
      }, duration);
      
    } else if (pipelineStepIndex === 3) {
      const srcName = importedFile ? importedFile.name : (MOCK_FEEDBACKS[selectedPresetKey] ? MOCK_FEEDBACKS[selectedPresetKey].title : "不明なファイル");
      const destName = srcName.replace(/\.[^/.]+$/, "") + '.mp3';
      
      if (apiKey && importedFile) {
        try {
          uploadedFileMeta = await uploadFileToGemini(importedFile, apiKey);
          uploadedFileMeta = await pollFileStatus(uploadedFileMeta, apiKey);
          advancePipeline(apiKey, isFast);
        } catch (err) {
          handlePipelineError(err.message);
        }
      } else {
        duration = isFast ? 600 : 3500;
        logToConsole('cmd', `> python upload_to_gemini.py --file "${destName}"`);
        logToConsole('info', `[INFO] Gemini Files APIへのアップロードを開始します...`);
        
        if (!isFast) {
          setTimeout(() => logToConsole('system', 'upload: [===         ] 25% completed'), 600);
          setTimeout(() => logToConsole('system', 'upload: [======      ] 50% completed'), 1200);
          setTimeout(() => logToConsole('system', 'upload: [=========   ] 75% completed'), 1800);
          setTimeout(() => logToConsole('system', 'upload: [============] 100% completed'), 2400);
        }
        
        setTimeout(() => {
          logToConsole('success', `[SUCCESS] アップロード完了。URI: https://generativelanguage.googleapis.com/v1beta/files/file-${Math.random().toString(36).substring(2, 10)}`);
          logToConsole('info', `[INFO] Gemini Files APIでのファイル処理状態を確認しています...`);
          setTimeout(() => {
            logToConsole('system', `[SYSTEM] State: PROCESSING`);
            setTimeout(() => {
              logToConsole('system', `[SYSTEM] State: ACTIVE`);
              logToConsole('success', `[SUCCESS] ファイルがアクティブになりました。`);
              advancePipeline(apiKey, isFast);
            }, isFast ? 100 : 800);
          }, isFast ? 100 : 800);
        }, duration);
      }
      
    } else if (pipelineStepIndex === 4) {
      // Node 4: Gemini Transcriber (文字起こし)
      if (apiKey && importedFile && uploadedFileMeta) {
        try {
          const modelSelect = document.getElementById('settings-model-select');
          const modelName = modelSelect ? modelSelect.value : 'gemini-2.5-pro';
          const apiResult = await transcribeInterviewWithGemini(uploadedFileMeta.uri, uploadedFileMeta.mimeType, apiKey, modelName);
          currentTranscription = apiResult;
          advancePipeline(apiKey, isFast);
        } catch (err) {
          handlePipelineError(err.message);
        }
      } else {
        duration = isFast ? 800 : 4000;
        logToConsole('cmd', `> python transcribe_interview.py --file_uri https://generativelanguage.googleapis.com/v1beta/files/file-example`);
        if (!apiKey) {
          logToConsole('error', `⚠️ [WARNING] Gemini APIキーが設定されていないため、実際の音声解析はスキップし、シミュレーション用のモックデータを使用します。`);
        } else if (!importedFile) {
          logToConsole('error', `⚠️ [WARNING] 音声ファイルの実体（ファイルオブジェクト）がメモリ内に存在しないため、実際の音声解析はスキップし、シミュレーション用のモックデータを使用します。（リロード等でメモリから消えた場合は、コントロールパネルからファイルを選択し直してください）`);
        } else {
          logToConsole('error', `⚠️ [WARNING] 音声ファイルのアップロード情報が存在しないため、実際の音声解析はスキップし、シミュレーション用のモックデータを使用します。`);
        }
        logToConsole('info', `[INFO] 【文字起こし処理中】Gemini 2.5 Flashを呼び出しています...`);
        logToConsole('system', `[SYSTEM] 音声データから話者分離（面接官・応募者）およびタイムスタンプ生成中...`);
        
        if (!isFast) {
          setTimeout(() => logToConsole('system', '[SYSTEM] LLM分析実行中 (0.5秒経過)...'), 800);
          setTimeout(() => logToConsole('system', '[SYSTEM] 音声の特徴量から高精度に書き起こしテキストを抽出中...'), 1600);
        }
        
        setTimeout(() => {
          logToConsole('success', `[SUCCESS] ハルシネーション防止用の高精度文字起こしを生成しました。`);
          
          let name = 'カスタム';
          if (importedFile) {
            name = extractCandidateName(importedFile.name);
          } else if (selectedPresetKey) {
            name = selectedPresetKey === 'sato' ? '佐藤' : selectedPresetKey === 'takahashi' ? '高橋' : '伊藤';
          }
          
          let templateKey = 'tanaka';
          if (selectedPresetKey) {
            templateKey = selectedPresetKey;
          } else {
            const templateKeys = ['tanaka', 'suzuki', 'yamada', 'sato', 'takahashi', 'ito'];
            templateKey = templateKeys[Math.floor(Math.random() * templateKeys.length)];
          }
          
          const rawTemplate = MOCK_FEEDBACKS[templateKey];
          const oldName = templateKey === 'tanaka' ? '田中' :
                          templateKey === 'suzuki' ? '鈴木' :
                          templateKey === 'yamada' ? '山田' :
                          templateKey === 'sato' ? '佐藤' :
                          templateKey === 'takahashi' ? '高橋' : '伊藤';
          
          const oldTranscription = rawTemplate.transcription || [];
          const mappedTranscription = oldTranscription.map(t => {
            return {
              time: t.time,
              speaker: t.speaker.replaceAll(oldName, name),
              text: t.text.replaceAll(oldName, name)
            };
          });
          
          currentTranscription = mappedTranscription;
          advancePipeline(apiKey, isFast);
        }, duration);
      }
      
    } else if (pipelineStepIndex === 5) {
      // Node 5: Gemini Evaluator (評価スコアリング)
      if (apiKey && importedFile && uploadedFileMeta && currentTranscription) {
        try {
          const modelSelect = document.getElementById('settings-model-select');
          const modelName = modelSelect ? modelSelect.value : 'gemini-2.5-pro';
          const transcriptFormatted = currentTranscription.map(t => `[${t.time}] ${t.speaker}: ${t.text}`).join('\n');
          const apiResult = await evaluateTranscriptWithGemini(transcriptFormatted, apiKey, modelName);
          
          const evalData = apiResult.evaluation;
          const scores = {
            icebreak_listening: evalData.icebreak_listening.score,
            question_deepening: evalData.question_deepening.score,
            attract_structure: evalData.attract_structure.score
          };
          const details = {
            icebreak_listening: { score: evalData.icebreak_listening.score, comment: evalData.icebreak_listening.reason, timestamps: [] },
            question_deepening: { score: evalData.question_deepening.score, comment: evalData.question_deepening.reason, timestamps: [] },
            attract_structure: { score: evalData.attract_structure.score, comment: evalData.attract_structure.reason, timestamps: [] }
          };
          const totalScore = scores.icebreak_listening + scores.question_deepening + scores.attract_structure;
          
          parsedResult = {
            title: importedFile.name,
            subtitle: `${new Date().toLocaleDateString('ja-JP')} ${new Date().toLocaleTimeString('ja-JP', {hour: '2-digit', minute:'2-digit'})} ・ 30分 ・ ${formatBytes(importedFile.size)}`,
            total: totalScore,
            scores: scores,
            details: details,
            strengths: apiResult.good_points,
            improvements: apiResult.improvement_points,
            overall: apiResult.overall_feedback,
            transcription: currentTranscription,
            diff: 'NEW',
            isMock: false
          };
          
          advancePipeline(apiKey, isFast);
        } catch (err) {
          handlePipelineError(err.message);
        }
      } else {
        duration = isFast ? 800 : 4000;
        logToConsole('cmd', `> python evaluate_transcript.py --transcript_file transcription.txt`);
        if (!apiKey) {
          logToConsole('error', `⚠️ [WARNING] Gemini APIキーが設定されていないため、実際の音声評価はスキップし、シミュレーション用のモックデータを使用します。`);
        } else if (!importedFile) {
          logToConsole('error', `⚠️ [WARNING] 音声ファイルの実体（ファイルオブジェクト）がメモリ内に存在しないため、実際の音声評価はスキップし、シミュレーション用のモックデータを使用します。（リロード等でメモリから消えた場合は、コントロールパネルからファイルを選択し直してください）`);
        } else {
          logToConsole('error', `⚠️ [WARNING] 音声ファイルのアップロード情報が存在しないため、実際の音声評価はスキップし、シミュレーション用のモックデータを使用します。`);
        }
        logToConsole('info', `[INFO] 【評価スコアリング処理中】生成された書き起こしテキストのみに基づいて客観評価を実行中...`);
        logToConsole('system', `[SYSTEM] 3大評価項目（アイスブレイク・傾聴力、質問・深掘り力、アトラクト・構造化）の採点・定性フィードバック作成中...`);
        
        setTimeout(() => {
          logToConsole('success', `[SUCCESS] 評価およびスコアリングのJSON結果を受信しました。`);
          
          let name = 'カスタム';
          if (importedFile) {
            name = extractCandidateName(importedFile.name);
          } else if (selectedPresetKey) {
            name = selectedPresetKey === 'sato' ? '佐藤' : selectedPresetKey === 'takahashi' ? '高橋' : '伊藤';
          }
          
          let templateKey = 'tanaka';
          if (selectedPresetKey) {
            templateKey = selectedPresetKey;
          } else {
            const templateKeys = ['tanaka', 'suzuki', 'yamada', 'sato', 'takahashi', 'ito'];
            templateKey = templateKeys[Math.floor(Math.random() * templateKeys.length)];
          }
          
          const rawTemplate = MOCK_FEEDBACKS[templateKey];
          const oldName = templateKey === 'tanaka' ? '田中' :
                          templateKey === 'suzuki' ? '鈴木' :
                          templateKey === 'yamada' ? '山田' :
                          templateKey === 'sato' ? '佐藤' :
                          templateKey === 'takahashi' ? '高橋' : '伊藤';
          
          parsedResult = replaceNameInObject(rawTemplate, oldName, name);
          parsedResult.transcription = currentTranscription;
          parsedResult.isMock = true;
          
          if (importedFile) {
            parsedResult.title = importedFile.name;
            parsedResult.subtitle = `${new Date().toLocaleDateString('ja-JP')} ${new Date().toLocaleTimeString('ja-JP', {hour: '2-digit', minute:'2-digit'})} ・ 30分 ・ ${formatBytes(importedFile.size)}`;
            parsedResult.diff = 'NEW';
          }
          
          advancePipeline(apiKey, isFast);
        }, duration);
      }
      
    } else if (pipelineStepIndex === 6) {
      // Node 6: Data Transformer (データ変換) (旧Step 5)
      duration = isFast ? 400 : 1500;
      logToConsole('cmd', `> python data_transformer.py --input raw_evaluation.json`);
      logToConsole('info', `[INFO] 実行スクリプト (data_transformer.py):`);
      logToConsole('system', `import json
import datetime

def main(event):
    # Geminiのレスポンス（JSON文字列）をパース
    raw_json = event['Node5_response_text']
    data = json.loads(raw_json)
    
    # 修正ポイント：面接官評価用の新しいJSONキーをスプレッドシートの列順（A〜I）に配置
    row_data = [
        datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),    # A列: 処理日時
        event['applicant_name'],                                  # B列: 面接官名 / ファイル名
        event.get('group_name', 'その他'),                       # C列: グループ (NEW)
        data["evaluation"]["icebreak_listening"]["score"],        # D列: アイスブレイク・傾聴力
        data["evaluation"]["question_deepening"]["score"],        # E列: 質問・深掘り力
        data["evaluation"]["attract_structure"]["score"],         # F列: アトラクト・構造化
        "\\n".join(data["good_points"]),                           # G列: 面接官の良かった点
        "\\n".join(data["improvement_points"]),                    # H列: 面接官の改善点
        data["overall_feedback"]                                  # I列: 総評
    ]
    
    # 文字起こし全文テキストの生成（変更なし）
    transcript_lines = []
    for line in data["transcription"]:
        transcript_lines.append(f"[{line['time']}] {line['speaker']}: {line['text']}")
    full_transcript_text = "\\n".join(transcript_lines)
    
    return {
        "spreadsheet_row": row_data,
        "full_transcript_text": full_transcript_text,
        "applicant_name": event['applicant_name']
    }`);
      logToConsole('info', `[INFO] 評価データの整形・集計処理を開始します...`);
      
      setTimeout(() => {
        const total = parsedResult.total;
        const gradeInfo = getGradeFromScore(total);
        parsedResult.grade = gradeInfo.grade;
        parsedResult.gradeLabel = gradeInfo.label;
        
        logToConsole('system', `[SYSTEM] 合計スコア: ${total}/15, 判定: ${parsedResult.grade} (${parsedResult.gradeLabel})`);
        logToConsole('info', `[INFO] スプレッドシート用1行データおよびDrive保存用ドキュメントを生成中...`);
        logToConsole('success', `[SUCCESS] データの変換・構造化が完了しました。`);
        advancePipeline(apiKey, isFast);
      }, duration);
      
    } else if (pipelineStepIndex === 7) {
      // Node 7: Output Connector (出力) (旧Step 6)
      duration = isFast ? 500 : 2500;
      const fileName = parsedResult.title.replace(/\.[^/.]+$/, "");
      
      logToConsole('cmd', `> python output_connector.py --sheets_data formatted_row.json --drive_text transcription.txt`);
      logToConsole('info', `[INFO] 各外部連携コネクタへの送信処理を開始します...`);
      logToConsole('info', `[INFO] Google Sheets API: 行データを「評価履歴」シートに追加中...`);
      
      setTimeout(() => {
        logToConsole('success', `[SUCCESS] Google Sheetsへ1行追加完了。`);
        logToConsole('info', `[INFO] Google Drive API: フォルダID「02_文字起こし・詳細レポート出力」に保存中...`);
        
        setTimeout(() => {
          logToConsole('success', `[SUCCESS] ファイル「${fileName}_文字起こし.txt」の書き込み完了。`);
          logToConsole('info', `[INFO] Slack Webhook: 通知チャンネル「#hr-interview-notifications」へメッセージ送信中...`);
          
          setTimeout(() => {
            logToConsole('success', `[SUCCESS] Slack通知の送信完了。`);
            advancePipeline(apiKey, isFast);
          }, isFast ? 200 : 800);
        }, isFast ? 200 : 800);
      }, isFast ? 200 : 900);
    }
  } catch (err) {
    handlePipelineError(err.message);
  }
}

function advancePipeline(apiKey, isFast) {
  const n = nodes.find(x => x.id === pipelineStepIndex);
  if (n) {
    const nodeEl = document.getElementById(`node-${n.id}`);
    const statusEl = document.getElementById(`node-${n.id}-status`);
    if (nodeEl) {
      nodeEl.className = 'pipeline-node done';
    }
    if (statusEl) {
      statusEl.textContent = '完了';
    }
    if (n.arrowId) {
      const arrowEl = document.getElementById(n.arrowId);
      if (arrowEl) arrowEl.className = 'pipeline-arrow done';
    }
  }
  
  pipelineStepIndex++;
  runPipelineStep(apiKey, isFast);
}

function handlePipelineError(msg) {
  pipelineRunning = false;
  pipelineCompleted = false;
  
  logToConsole('error', `[ERROR] パイプラインの実行中にエラーが発生しました: ${msg}`);
  
  const n = nodes.find(x => x.id === pipelineStepIndex);
  if (n) {
    const nodeEl = document.getElementById(`node-${n.id}`);
    const statusEl = document.getElementById(`node-${n.id}-status`);
    if (nodeEl) nodeEl.className = 'pipeline-node error';
    if (statusEl) {
      statusEl.textContent = 'エラー';
      statusEl.className = 'node-status error';
    }
  }
  
  const pipelineStatus = document.getElementById('pipeline-status');
  if (pipelineStatus) {
    pipelineStatus.textContent = 'エラー終了';
    pipelineStatus.className = 'status-badge error';
  }
  
  const btnRun = document.getElementById('btn-run-pipeline');
  const btnReset = document.getElementById('btn-reset-pipeline');
  const videoSelect = document.getElementById('agent-video-select');
  
  if (btnRun) btnRun.disabled = false;
  if (btnReset) btnReset.disabled = false;
  if (videoSelect) videoSelect.disabled = false;
  
  showToast('❌', '処理中にエラーが発生しました。詳細はコンソールを確認してください。');
}

function finishPipeline() {
  pipelineRunning = false;
  pipelineCompleted = true;
  
  const pipelineStatus = document.getElementById('pipeline-status');
  if (pipelineStatus) {
    pipelineStatus.textContent = '処理完了';
    pipelineStatus.className = 'status-badge done';
  }
  
  const btnRun = document.getElementById('btn-run-pipeline');
  const btnReset = document.getElementById('btn-reset-pipeline');
  const videoSelect = document.getElementById('agent-video-select');
  
  if (btnRun) btnRun.disabled = true;
  if (btnReset) btnReset.disabled = false;
  if (videoSelect) videoSelect.disabled = false;
  
  logToConsole('success', `[SUCCESS] 全てのノードの実行が正常に完了しました！成果物が生成されました。`);
  showToast('✅', `${parsedResult.title} の評価・格納が完了しました！`);
  
  // Resolve candidate key here to avoid duplicate rows and ensure same key is used everywhere
  let candidateKey = '';
  if (importedFile) {
    const existingPendingVideo = VIDEOS_DATA.find(v => v.name === importedFile.name && v.status === 'pending');
    if (existingPendingVideo) {
      candidateKey = existingPendingVideo.key;
    } else {
      candidateKey = 'custom_' + Date.now();
    }
  } else if (selectedPresetKey) {
    candidateKey = selectedPresetKey;
  } else {
    candidateKey = 'custom_' + Date.now();
  }

  updatePreviewsWithResults(candidateKey);
  integrateResultsIntoApp(candidateKey);
}

function updatePreviewsWithResults(candidateKey) {
  const body = document.getElementById('preview-sheets-body');
  if (body) {
    const row = document.createElement('tr');
    row.style.animation = 'fadeIn 0.5s ease';
    
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const shortStrengths = parsedResult.strengths.join(', ').substring(0, 20) + '...';
    const shortImprovements = parsedResult.improvements.join(', ').substring(0, 20) + '...';
    const shortOverall = parsedResult.overall.substring(0, 25) + '...';
    
    const groupInput = document.getElementById('agent-group-input');
    const groupName = groupInput ? (groupInput.value.trim() || 'その他') : 'その他';
    
    row.innerHTML = `
      <td>${formattedDate}</td>
      <td><strong>${parsedResult.title.replace('.mp4', '').replace('.mp3', '')}</strong></td>
      <td>${groupName}</td>
      <td>${parsedResult.scores.icebreak_listening}</td>
      <td>${parsedResult.scores.question_deepening}</td>
      <td>${parsedResult.scores.attract_structure}</td>
      <td>${shortStrengths}</td>
      <td>${shortImprovements}</td>
      <td>${shortOverall}</td>
    `;
    
    body.insertBefore(row, body.firstChild);
  }
  
  const driveFiles = document.getElementById('preview-drive-files');
  if (driveFiles) {
    const fileItem = document.createElement('div');
    fileItem.className = 'drive-file-item';
    fileItem.style.animation = 'fadeIn 0.5s ease';
    
    MOCK_FEEDBACKS[candidateKey] = parsedResult;
    
    const baseTitle = parsedResult.title.replace('.mp4', '').replace('.mp3', '');
    fileItem.innerHTML = `
      <span class="file-icon">📄</span>
      <span class="file-name">${baseTitle}_文字起こし.txt</span>
      <button class="btn btn-sm btn-secondary" onclick="viewDriveFileMock('${candidateKey}')">表示</button>
    `;
    
    driveFiles.insertBefore(fileItem, driveFiles.firstChild);
  }
  
  const slackList = document.getElementById('slack-messages-list');
  if (slackList) {
    const slackMsg = document.createElement('div');
    slackMsg.className = 'slack-message';
    slackMsg.style.animation = 'fadeIn 0.5s ease';
    
    const formattedTime = new Date().toLocaleDateString('ja-JP') + ' ' + new Date().toLocaleTimeString('ja-JP', {hour: '2-digit', minute:'2-digit'});
    const baseTitle = parsedResult.title.replace('.mp4', '').replace('.mp3', '');
    slackMsg.innerHTML = `
      <div class="slack-avatar">🤖</div>
      <div class="slack-content">
        <div class="slack-user">Interview AI Agent <span class="slack-time">${formattedTime}</span></div>
        <div class="slack-text">【面接官評価完了】<strong>${baseTitle}</strong> の評価・格納が完了しました。スプレッドシートおよびDriveをご確認ください。</div>
      </div>
    `;
    
    slackList.insertBefore(slackMsg, slackList.firstChild);
  }
}

function integrateResultsIntoApp(candidateKey) {
  const baseTitle = parsedResult.title.replace('.mp4', '').replace('.mp3', '');
  const groupInput = document.getElementById('agent-group-input');
  const groupName = groupInput ? (groupInput.value.trim() || 'その他') : 'その他';
  
  const existingVideo = VIDEOS_DATA.find(v => v.key === candidateKey);
  if (existingVideo) {
    existingVideo.status = 'done';
    existingVideo.grade = parsedResult.grade;
    existingVideo.score = parsedResult.total;
    existingVideo.isNew = false;
    existingVideo.hidden = false;
    existingVideo.group = groupName;
    
    MOCK_FEEDBACKS[candidateKey] = parsedResult;
  } else {
    MOCK_FEEDBACKS[candidateKey] = parsedResult;
    
    const newVideo = {
      key: candidateKey,
      name: parsedResult.title,
      date: new Date().toLocaleDateString('ja-JP'),
      duration: parsedResult.subtitle.includes('分') ? parsedResult.subtitle.split(' ・ ')[1] : '30分',
      size: parsedResult.subtitle.includes('MB') ? parsedResult.subtitle.split(' ・ ')[2] : '150 MB',
      status: 'done',
      grade: parsedResult.grade,
      score: parsedResult.total,
      isNew: false,
      hidden: false,
      group: groupName
    };
    VIDEOS_DATA.unshift(newVideo);
  }
  
  updateGroupDropdowns();
  renderVideosTable();
  updateDashboardMetrics();
  
  const historyItem = HISTORY_DATA.find(h => h.key === candidateKey);
  if (historyItem) {
    historyItem.score = parsedResult.total;
    historyItem.grade = parsedResult.grade;
    historyItem.group = groupName;
  } else {
    HISTORY_DATA.unshift({
      key: candidateKey,
      date: new Date().toLocaleDateString('ja-JP'),
      name: extractCandidateName(parsedResult.title) + '面接官',
      score: parsedResult.total,
      grade: parsedResult.grade,
      group: groupName
    });
  }
  
  renderHistoryList();
  
  if (trendChartInstance) {
    trendChartInstance.data.labels = HISTORY_DATA.map(h => h.date.slice(5) || h.date).reverse();
    trendChartInstance.data.datasets[0].data = HISTORY_DATA.map(h => h.score).reverse();
    trendChartInstance.update();
  }
  if (historyChartInstance) {
    historyChartInstance.data.labels = HISTORY_DATA.map(h => h.name).reverse();
    historyChartInstance.data.datasets[0].data = HISTORY_DATA.map(h => h.score).reverse();
    historyChartInstance.data.datasets[0].backgroundColor = HISTORY_DATA.map(h => {
      const colors = { A:'rgba(52,211,153,0.6)', B:'rgba(59,130,246,0.6)', C:'rgba(245,158,11,0.6)', D:'rgba(239,68,68,0.6)' };
      return colors[h.grade];
    }).reverse();
    historyChartInstance.update();
  }
  if (gradeDistChartInstance) {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    HISTORY_DATA.forEach(h => {
      if (counts[h.grade] !== undefined) counts[h.grade]++;
    });
    gradeDistChartInstance.data.datasets[0].data = [counts.A, counts.B, counts.C, counts.D];
    gradeDistChartInstance.update();
  }
  
  saveStateToLocalStorage();
}

function resetAgentPipeline() {
  if (pipelineRunning) return;
  
  importedFile = null;
  selectedPresetKey = null;
  uploadedFileMeta = null;
  parsedResult = null;
  pipelineCompleted = false;
  
  const fileInput = document.getElementById('agent-file-input');
  const videoSelect = document.getElementById('agent-video-select');
  const fileInfo = document.getElementById('imported-file-info');
  const dropzone = document.getElementById('import-dropzone');
  const btnRun = document.getElementById('btn-run-pipeline');
  const btnReset = document.getElementById('btn-reset-pipeline');
  
  if (fileInput) fileInput.value = "";
  if (videoSelect) videoSelect.value = "";
  if (fileInfo) fileInfo.style.display = 'none';
  if (dropzone) dropzone.style.display = 'block';
  
  const groupInput = document.getElementById('agent-group-input');
  if (groupInput) groupInput.value = "";
  
  if (btnRun) btnRun.disabled = true;
  if (btnReset) btnReset.disabled = true;
  if (videoSelect) videoSelect.disabled = false;
  
  const pipelineStatus = document.getElementById('pipeline-status');
  if (pipelineStatus) {
    pipelineStatus.textContent = '待機中';
    pipelineStatus.className = 'status-badge pending';
  }
  
  nodes.forEach(n => {
    const nodeEl = document.getElementById(`node-${n.id}`);
    const statusEl = document.getElementById(`node-${n.id}-status`);
    if (nodeEl) nodeEl.className = 'pipeline-node';
    if (statusEl) {
      statusEl.textContent = '待機中';
      statusEl.className = 'node-status';
    }
    if (n.arrowId) {
      const arrowEl = document.getElementById(n.arrowId);
      if (arrowEl) arrowEl.className = 'pipeline-arrow';
    }
  });
  
  clearConsole();
  logToConsole('system', '[SYSTEM] パイプラインがリセットされました。実行ファイルを選択またはインポートしてください。');
}

function viewDriveFileMock(key) {
  let filename = '';
  let transcriptionText = '';
  
  const fb = MOCK_FEEDBACKS[key];
  if (fb) {
    filename = fb.title.replace('.mp4', '').replace('.mp3', '') + '_文字起こし.txt';
    transcriptionText = Array.isArray(fb.transcription) 
      ? fb.transcription.map(t => `[${t.time}] ${t.speaker}: ${t.text}`).join('\n')
      : fb.transcription || '文字起こしデータはありません。';
  } else {
    showToast('⚠️', 'ファイルが見つかりません');
    return;
  }

  let modalOverlay = document.getElementById('drive-file-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'drive-file-modal';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="modal" style="max-width: 700px; width: 90%;">
      <div class="flex-between mb-16" style="border-bottom: 1px solid var(--border); padding-bottom: 12px;">
        <h3 class="modal-title" style="margin: 0; font-size: 16px; color: var(--accent-cyan);">📁 ${filename}</h3>
        <button class="btn-icon" id="close-modal-btn">✕</button>
      </div>
      <div style="background: #05070f; border: 1px solid var(--border); border-radius: 8px; padding: 16px; max-height: 450px; overflow-y: auto;">
        <pre style="font-family: 'Courier New', Courier, monospace, 'Noto Sans JP'; font-size: 13px; line-height: 1.6; color: var(--text-primary); white-space: pre-wrap; margin: 0;">${transcriptionText}</pre>
      </div>
      <div class="flex mt-20" style="justify-content: flex-end;">
        <button class="btn btn-secondary" id="close-modal-btn-bottom">閉じる</button>
      </div>
    </div>
  `;

  modalOverlay.style.display = 'flex';
  setTimeout(() => {
    modalOverlay.classList.add('active');
  }, 10);

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      modalOverlay.style.display = 'none';
    }, 250);
  };

  document.getElementById('close-modal-btn').addEventListener('click', closeModal);
  document.getElementById('close-modal-btn-bottom').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

// ===== Update Group Dropdowns =====
function updateGroupDropdowns() {
  const dashboardSelect = document.getElementById('dashboardGroupSelect');
  const filterSelect = document.getElementById('videoTableGroupFilter');
  if (!dashboardSelect && !filterSelect) return;

  const dashboardVal = dashboardSelect ? dashboardSelect.value : 'all';
  const filterVal = filterSelect ? filterSelect.value : 'all';

  const groupsSet = new Set(['新卒採用チーム', '中途開発チーム', 'カスタマーサポートチーム', 'その他']);
  VIDEOS_DATA.forEach(v => {
    if (v.group) groupsSet.add(v.group);
  });
  HISTORY_DATA.forEach(h => {
    if (h.group) groupsSet.add(h.group);
  });

  const uniqueGroups = Array.from(groupsSet).filter(g => g && g.trim() !== '');

  if (dashboardSelect) {
    dashboardSelect.innerHTML = `<option value="all">全社</option>` + 
      uniqueGroups.map(g => `<option value="${g}">${g}</option>`).join('');
    if (uniqueGroups.includes(dashboardVal) || dashboardVal === 'all') {
      dashboardSelect.value = dashboardVal;
    } else {
      dashboardSelect.value = 'all';
    }
  }

  if (filterSelect) {
    filterSelect.innerHTML = `<option value="all">すべてのグループ</option>` + 
      uniqueGroups.map(g => `<option value="${g}">${g}</option>`).join('');
    if (uniqueGroups.includes(filterVal) || filterVal === 'all') {
      filterSelect.value = filterVal;
    } else {
      filterSelect.value = 'all';
    }
  }
}

function renderVideosTable() {
  const tbody = document.getElementById('videoTableBody');
  if (!tbody) return;
  
  const filterSelect = document.getElementById('videoTableGroupFilter');
  const activeFilter = filterSelect ? filterSelect.value : 'all';
  
  const filteredVideos = VIDEOS_DATA.filter(v => {
    if (v.hidden) return false;
    return activeFilter === 'all' || v.group === activeFilter;
  });
  
  if (filteredVideos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">該当する動画はありません</td></tr>`;
    return;
  }
  
  tbody.innerHTML = filteredVideos.map(v => {
    let statusBadge = '';
    let scoreBadge = '';
    let actionBtn = '';
    
    if (v.status === 'done') {
      statusBadge = `<span class="status-badge done">✓ 分析済み</span>`;
      scoreBadge = `<span class="grade-badge ${v.grade}">${v.grade}</span>`;
      actionBtn = `<button class="btn btn-sm btn-secondary" onclick="showFeedbackPage('${v.key}')">詳細</button>`;
    } else if (v.status === 'processing') {
      statusBadge = `<span class="status-badge processing">⟳ 分析中...</span>`;
      scoreBadge = `—`;
      actionBtn = `<button class="btn btn-sm btn-primary" disabled>🤖 分析</button>`;
    } else {
      statusBadge = `<span class="status-badge pending">● 未分析</span>`;
      scoreBadge = `—`;
      actionBtn = `<button class="btn btn-sm btn-primary" onclick="simulateAnalyzeSingle(this)">🤖 分析</button>`;
    }
    
    const isNewMarkup = v.isNew ? `<strong style="color:var(--accent-cyan)">NEW</strong>` : `Google Drive • 自動検出`;
    
    return `
      <tr data-key="${v.key}">
        <td>
          <div class="file-name">${v.name}</div>
          <div class="file-meta">${isNewMarkup}</div>
        </td>
        <td>
          <input type="text" value="${v.group || ''}" onchange="changeVideoGroup('${v.key}', this.value)" style="padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border); background: var(--bg-primary); color: var(--text-primary); font-size: 12px; max-width: 140px; width: 100%;">
        </td>
        <td>${v.date}</td>
        <td>${v.duration}</td>
        <td>${v.size}</td>
        <td>${statusBadge}</td>
        <td>${scoreBadge}</td>
        <td>${actionBtn}</td>
      </tr>
    `;
  }).join('');
}

function filterVideosTable() {
  renderVideosTable();
}

function changeVideoGroup(key, newGroup) {
  const video = VIDEOS_DATA.find(v => v.key === key);
  if (video) {
    video.group = newGroup;
    // Also update matching entry in HISTORY_DATA
    const historyItem = HISTORY_DATA.find(h => h.key === key);
    if (historyItem) {
      historyItem.group = newGroup;
    }
    updateGroupDropdowns();
    updateDashboardMetrics();
    renderVideosTable();
    saveStateToLocalStorage();
  }
}

function handleDashboardGroupChange() {
  updateDashboardMetrics();
}

function updateDashboardTrendChart(group = 'all') {
  if (!trendChartInstance) return;
  const filteredHistory = HISTORY_DATA.filter(h => group === 'all' || h.group === group);
  
  trendChartInstance.data.labels = filteredHistory.map(h => h.date.slice(5)).reverse();
  trendChartInstance.data.datasets[0].data = filteredHistory.map(h => h.score).reverse();
  trendChartInstance.update();
}

function updateDashboardMetrics() {
  const groupSelect = document.getElementById('dashboardGroupSelect');
  const group = groupSelect ? groupSelect.value : 'all';

  const filteredVideos = VIDEOS_DATA.filter(v => group === 'all' || v.group === group);

  const analyzedVideos = filteredVideos.filter(v => v.status === 'done').length;
  const pendingVideos = filteredVideos.filter(v => v.status === 'pending' && !v.hidden).length;
  
  const analyzedScores = filteredVideos.filter(v => v.status === 'done' && v.score !== null).map(v => v.score);
  const avgScore = analyzedScores.length ? (analyzedScores.reduce((a,b)=>a+b, 0) / analyzedScores.length).toFixed(1) : '—';
  
  const analyzedGrades = filteredVideos.filter(v => v.status === 'done' && v.grade !== '—').map(v => v.grade);
  let highestGrade = '—';
  let highestGradeSub = '判定データなし';
  if (analyzedGrades.length > 0) {
    if (analyzedGrades.includes('A')) {
      highestGrade = 'A';
      const aCount = analyzedGrades.filter(g => g === 'A').length;
      highestGradeSub = `全${analyzedGrades.length}件中 ${aCount}件`;
    } else if (analyzedGrades.includes('B')) {
      highestGrade = 'B';
      const bCount = analyzedGrades.filter(g => g === 'B').length;
      highestGradeSub = `全${analyzedGrades.length}件中 ${bCount}件`;
    } else if (analyzedGrades.includes('C')) {
      highestGrade = 'C';
      const cCount = analyzedGrades.filter(g => g === 'C').length;
      highestGradeSub = `全${analyzedGrades.length}件中 ${cCount}件`;
    } else if (analyzedGrades.includes('D')) {
      highestGrade = 'D';
      const dCount = analyzedGrades.filter(g => g === 'D').length;
      highestGradeSub = `全${analyzedGrades.length}件中 ${dCount}件`;
    }
  }
  
  const statCards = document.querySelectorAll('.stat-card');
  if (statCards[0]) {
    statCards[0].querySelector('.stat-value').textContent = analyzedVideos.toString();
  }
  if (statCards[1]) {
    statCards[1].querySelector('.stat-value').textContent = avgScore.toString();
  }
  if (statCards[2]) {
    statCards[2].querySelector('.stat-value').textContent = highestGrade;
    const changeEl = statCards[2].querySelector('.stat-change');
    if (changeEl) {
      changeEl.textContent = highestGradeSub;
      if (highestGrade === '—') {
        changeEl.className = 'stat-change down';
      } else {
        changeEl.className = 'stat-change up';
      }
    }
  }
  if (statCards[3]) {
    statCards[3].querySelector('.stat-value').textContent = pendingVideos.toString();
  }
  
  renderDashboardRecentFeedback(group);
  updateDashboardTrendChart(group);
}

function renderDashboardRecentFeedback(group = 'all') {
  const container = document.getElementById('dashboard-recent-feedback-list');
  if (!container) return;
  
  const filteredVideos = VIDEOS_DATA.filter(v => group === 'all' || v.group === group);
  const recentDone = filteredVideos.filter(v => v.status === 'done').slice(0, 3);
  
  if (recentDone.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>該当するグループの分析済み録画はありません</p></div>`;
    return;
  }
  
  container.innerHTML = recentDone.map(v => {
    const fb = MOCK_FEEDBACKS[v.key];
    const total = fb ? fb.total : v.score;
    const grade = fb ? fb.grade : v.grade;
    const desc = fb ? fb.overall.substring(0, 45) + '...' : '評価の詳細は詳細ボタンから確認してください。';
    
    return `
      <div class="feedback-item">
        <div class="feedback-item-header">
          <div class="feedback-item-title">🎬 ${v.name}</div>
          <div class="grade-badge ${grade}" style="width:28px; height:28px; font-size:12px;">${grade}</div>
        </div>
        <div class="feedback-item-comment">${desc}</div>
        <div class="flex-between mt-12">
          <span class="text-sm text-muted">📊 スコア: ${total}/15</span>
          <button class="btn btn-sm btn-secondary" onclick="showFeedbackPage('${v.key}')">FB詳細</button>
        </div>
      </div>
    `;
  }).join('');
}

function setupImportEvents() {
  const dropzone = document.getElementById('import-dropzone');
  const fileInput = document.getElementById('agent-file-input');
  
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => {
      if (!pipelineRunning && !pipelineCompleted) {
        fileInput.click();
      }
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!pipelineRunning && !pipelineCompleted) {
        dropzone.classList.add('dragover');
      }
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (pipelineRunning || pipelineCompleted) return;
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
      }
    });
  }
}

function setupVideosImportEvents() {
  const dropzone = document.getElementById('videos-import-dropzone');
  const fileInput = document.getElementById('videos-file-input');
  
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleVideosFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleVideosFileSelect(e.target.files[0]);
      }
    });
  }
}

function handleVideosFileSelect(file) {
  const fileKey = 'custom_' + Date.now();
  const newVideo = {
    key: fileKey,
    name: file.name,
    date: new Date().toLocaleDateString('ja-JP'),
    duration: '30分',
    size: formatBytes(file.size),
    status: 'pending',
    grade: '—',
    score: null,
    isNew: true,
    hidden: false,
    fileObject: file,
    group: 'その他'
  };
  
  VIDEOS_DATA.unshift(newVideo);
  
  updateGroupDropdowns();
  renderVideosTable();
  updateDashboardMetrics();
  
  // Update sidebar badge
  const badge = document.querySelector('#nav-videos .badge');
  if (badge) {
    const pendingCount = VIDEOS_DATA.filter(v => v.status === 'pending' && !v.hidden).length;
    badge.textContent = pendingCount.toString();
  }
  
  showToast('✅', `${file.name} を録画一覧に追加しました`);
  saveStateToLocalStorage();
}

function setupApiKeyEvents() {
  const apiKeyInput = document.getElementById('settings-api-key');
  const apiKeyStatus = document.getElementById('api-key-status');
  const modelSelect = document.getElementById('settings-model-select');
  const firebaseConfigInput = document.getElementById('settings-firebase-config');
  const firebaseStatus = document.getElementById('firebase-status');
  
  // Load settings on initialization
  if (apiKeyInput) {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      apiKeyInput.value = savedKey;
    }
  }
  if (modelSelect) {
    const savedModel = localStorage.getItem('gemini_model_select');
    if (savedModel) {
      modelSelect.value = savedModel;
      updateModelSettingsText();
    }
  }
  if (firebaseConfigInput) {
    const savedConfig = localStorage.getItem('gemini_firebase_config');
    if (savedConfig) {
      firebaseConfigInput.value = savedConfig;
    } else {
      const defaultConfig = {
        apiKey: "AIzaSyDObpH4ht2ky2BOXMFKnKezX3L6izKPicg",
        authDomain: "interview-feedback-team.firebaseapp.com",
        projectId: "interview-feedback-team",
        storageBucket: "interview-feedback-team.firebasestorage.app",
        messagingSenderId: "116272718812",
        appId: "1:116272718812:web:dd78b59c9404bfa5fbe519"
      };
      firebaseConfigInput.value = JSON.stringify(defaultConfig, null, 2);
    }
  }
  
  if (apiKeyInput && apiKeyStatus) {
    const checkStatus = () => {
      const val = apiKeyInput.value.trim();
      if (val) {
        apiKeyStatus.textContent = '実API接続モード';
        apiKeyStatus.className = 'status-badge done';
        localStorage.setItem('gemini_api_key', val);
      } else {
        apiKeyStatus.textContent = 'シミュレーション';
        apiKeyStatus.className = 'status-badge pending';
        localStorage.removeItem('gemini_api_key');
      }
    };
    
    apiKeyInput.addEventListener('input', checkStatus);
    checkStatus();
  }

  if (modelSelect) {
    modelSelect.addEventListener('change', () => {
      localStorage.setItem('gemini_model_select', modelSelect.value);
    });
  }

  if (firebaseConfigInput) {
    const checkFirebaseStatus = () => {
      const val = firebaseConfigInput.value.trim();
      if (val) {
        try {
          JSON.parse(val);
          localStorage.setItem('gemini_firebase_config', val);
          if (firebaseStatus) {
            firebaseStatus.textContent = '接続設定保存完了（再読込で接続）';
            firebaseStatus.className = 'status-badge done';
          }
        } catch (e) {
          if (firebaseStatus) {
            firebaseStatus.textContent = '無効なJSON形式です';
            firebaseStatus.className = 'status-badge pending';
          }
        }
      } else {
        localStorage.removeItem('gemini_firebase_config');
        if (firebaseStatus) {
          firebaseStatus.textContent = '未接続（ローカル保存）';
          firebaseStatus.className = 'status-badge pending';
        }
      }
    };
    firebaseConfigInput.addEventListener('input', checkFirebaseStatus);
    // Initial status check
    if (firebaseDb && firebaseStatus) {
      firebaseStatus.textContent = '接続完了（クラウド同期中）';
      firebaseStatus.className = 'status-badge done';
    } else {
      checkFirebaseStatus();
    }
  }
}

function switchHistoryChart(btn, type) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ===== Init =====
function updateModelSettingsText() {
  const modelSelect = document.getElementById('settings-model-select');
  const costHintEl = document.getElementById('model-cost-hint');
  if (modelSelect && costHintEl) {
    const model = modelSelect.value;
    if (model === 'gemini-2.5-pro') {
      costHintEl.innerHTML = `💡 推定コスト: 30分動画1本あたり <strong>約120円</strong>（Gemini 2.5 Pro使用時）`;
    } else if (model === 'gemini-2.5-flash') {
      costHintEl.innerHTML = `💡 推定コスト: 30分動画1本あたり <strong>約8円</strong>（Gemini 2.5 Flash使用時）`;
    } else if (model === 'gemini-1.5-pro') {
      costHintEl.innerHTML = `💡 推定コスト: 30分動画1本あたり <strong>約120円</strong>（Gemini 1.5 Pro使用時）`;
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Tag all initial presets as mock data
  for (const key in MOCK_FEEDBACKS) {
    if (MOCK_FEEDBACKS[key]) {
      MOCK_FEEDBACKS[key].isMock = true;
    }
  }

  // Load custom feedbacks from localStorage
  try {
    const savedFeedbacks = localStorage.getItem('interview_custom_feedbacks');
    if (savedFeedbacks) {
      const customFeedbacks = JSON.parse(savedFeedbacks);
      Object.assign(MOCK_FEEDBACKS, customFeedbacks);
    }
  } catch (e) {
    console.error("Failed to load custom feedbacks from localStorage:", e);
  }

  // Load HISTORY_DATA from localStorage
  try {
    const savedHistory = localStorage.getItem('interview_history_data');
    if (savedHistory) {
      HISTORY_DATA = JSON.parse(savedHistory);
    } else {
      HISTORY_DATA = [];
    }
  } catch (e) {
    HISTORY_DATA = [];
  }

  // Load VIDEOS_DATA from localStorage
  const PRESET_VIDEOS = [
    { key: 'sato', name: '佐藤面接官_0417.mp4', date: '2026/04/17', duration: '30分', size: '268 MB', status: 'pending', grade: '—', score: null, isNew: true, hidden: true, group: '新卒採用チーム' },
    { key: 'takahashi', name: '高橋面接官_0417.mp4', date: '2026/04/17', duration: '27分', size: '231 MB', status: 'pending', grade: '—', score: null, isNew: true, hidden: true, group: '中途開発チーム' },
    { key: 'ito', name: '伊藤面接官_0416.mp4', date: '2026/04/16', duration: '35分', size: '312 MB', status: 'pending', grade: '—', score: null, isNew: true, hidden: true, group: '新卒採用チーム' }
  ];

  try {
    const savedVideos = localStorage.getItem('interview_videos_data');
    if (savedVideos) {
      VIDEOS_DATA = JSON.parse(savedVideos);
    } else {
      VIDEOS_DATA = [...PRESET_VIDEOS];
    }
  } catch (e) {
    VIDEOS_DATA = [...PRESET_VIDEOS];
  }

  // Initialize Firebase if config is saved
  try {
    let savedConfig = localStorage.getItem('gemini_firebase_config');
    const globalSyncBadge = document.getElementById('global-sync-badge');
    
    if (!savedConfig) {
      // Default fallback config for automatic connection out of the box
      const defaultConfig = {
        apiKey: "AIzaSyDObpH4ht2ky2BOXMFKnKezX3L6izKPicg",
        authDomain: "interview-feedback-team.firebaseapp.com",
        projectId: "interview-feedback-team",
        storageBucket: "interview-feedback-team.firebasestorage.app",
        messagingSenderId: "116272718812",
        appId: "1:116272718812:web:dd78b59c9404bfa5fbe519"
      };
      savedConfig = JSON.stringify(defaultConfig);
    }
    
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      if (firebase.apps.length === 0) {
        firebase.initializeApp(config);
      }
      firebaseDb = firebase.firestore();
      
      // Setup real-time listeners (this will automatically fetch and render updates)
      setupFirestoreRealtimeSync();
    } else {
      if (globalSyncBadge) {
        globalSyncBadge.textContent = '⚪ ローカル保存';
        globalSyncBadge.className = 'status-badge pending';
      }
    }
  } catch (e) {
    console.error("Failed to initialize Firebase:", e);
    const firebaseStatus = document.getElementById('firebase-status');
    const globalSyncBadge = document.getElementById('global-sync-badge');
    if (firebaseStatus) {
      firebaseStatus.textContent = '接続エラー';
      firebaseStatus.className = 'status-badge pending';
    }
    if (globalSyncBadge) {
      globalSyncBadge.textContent = '🔴 接続エラー';
      globalSyncBadge.className = 'status-badge pending';
    }
  }

  updateGroupDropdowns();
  initTrendChart();
  initHistoryChart();
  initGradeDistChart();
  renderHistoryList();
  renderCriteriaSettings();
  renderVideosTable();
  updateDashboardMetrics();
  setupImportEvents();
  setupApiKeyEvents();
  setupVideosImportEvents();
});
