import { createContext, useContext, useState, type ReactNode } from 'react'

type Lang = 'en' | 'bg'

interface LanguageContextType {
  lang: Lang
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  'nav.howItWorks': { en: 'How It Works', bg: 'Как работи' },
  'nav.modules': { en: 'Modules', bg: 'Модули' },
  'nav.uxTrust': { en: 'Why Octolio', bg: 'Защо Octolio' },
  'nav.faq': { en: 'FAQ', bg: 'ЧЗВ' },
  'nav.aboutUs': { en: 'About Us', bg: 'За нас' },
  'nav.home': { en: 'Home', bg: 'Начало' },

  // Hero
  'hero.title1': { en: 'Master your money,', bg: 'Овладей парите си,' },
  'hero.title2': { en: 'one lesson at a time.', bg: 'един урок наведнъж.' },
  'hero.subtitle': { en: 'Bite-sized financial lessons, daily quests, and streaks that turn learning about money into a habit you actually keep.', bg: 'Кратки финансови уроци, дневни мисии и серии, които превръщат ученето за пари в навик, който наистина задържаш.' },
  'hero.cta': { en: 'Launch the App', bg: 'Стартирай приложението' },
  'hero.howItWorks': { en: 'See How It Works', bg: 'Виж как работи' },
  'hero.scroll': { en: 'Scroll', bg: 'Скролни' },

  // About section
  'about.badge': { en: 'Financial literacy, gamified.', bg: 'Финансова грамотност, геймифицирана.' },
  'about.title1': { en: 'Money skills that ', bg: 'Финансови умения, които ' },
  'about.title2': { en: 'actually stick.', bg: 'наистина остават.' },
  'about.desc': { en: 'Octolio breaks personal finance into 5-minute lessons mixing short theory cards with hands-on exercises — drag a budget into shape, decode a credit score, build your first index-fund portfolio. Earn XP, keep a streak, and climb a friendly weekly league.', bg: 'Octolio разбива личните финанси на 5-минутни уроци, които комбинират кратки теоретични карти с практически упражнения — направи бюджет с плъзгачи, разшифровай кредитния си рейтинг, изгради първото си портфолио от индексни фондове. Печели XP, поддържай серия и се изкачвай в приятелска седмична лига.' },
  'about.stat1.value': { en: '5 min', bg: '5 мин' },
  'about.stat1': { en: 'per lesson', bg: 'на урок' },
  'about.stat2.value': { en: 'Free', bg: 'Безплатно' },
  'about.stat2': { en: 'to start', bg: 'за начало' },
  'about.stat3.value': { en: 'EN · BG', bg: 'EN · BG' },
  'about.stat3': { en: 'fully bilingual', bg: 'напълно двуезично' },
  'about.commandCenter': { en: 'Your Progress', bg: 'Твоят прогрес' },
  'about.northStar': { en: 'Lv.3 · Analyst', bg: 'Ниво 3 · Аналитик' },
  'about.readiness': { en: '1,000 / 1,400 XP', bg: '1,000 / 1,400 XP' },
  'about.dailyQuest': { en: 'Daily Quest · Daily Scholar', bg: 'Дневна мисия · Прилежен ученик' },
  'about.dailyQuestDesc': { en: 'Complete 1 lesson today (+25 XP)', bg: 'Завърши 1 урок днес (+25 XP)' },
  'about.done': { en: 'Done', bg: 'Готово' },
  'about.nextMission': { en: 'Next Lesson', bg: 'Следващ урок' },
  'about.chooseAvalanche': { en: 'Build Your Budget', bg: 'Изгради бюджета си' },
  'about.fasterDebt': { en: 'Allocate a real €3,000 salary using the 50/30/20 rule', bg: 'Разпредели реална заплата от €3,000 по правилото 50/30/20' },
  'about.tip': { en: 'Money Fact', bg: 'Финансов факт' },
  'about.jitLesson': { en: 'Pay yourself first', bg: 'Плати първо на себе си' },
  'about.riskMatters': { en: 'Automate savings before spending', bg: 'Автоматизирай спестяванията преди разходите' },
  'about.whyWorks': { en: 'Why It Works', bg: 'Защо работи' },
  'about.whyWorksDesc': { en: 'Short sessions, instant feedback, and a streak you don\'t want to break — the same loop that makes language apps stick, applied to the financial decisions you actually face.', bg: 'Кратки сесии, мигновена обратна връзка и серия, която не искаш да прекъснеш — същият цикъл, който прави езиковите приложения толкова прилепчиви, приложен към финансовите решения, които реално взимаш.' },

  // Features
  'features.eyebrow': { en: 'What\'s inside', bg: 'Какво има вътре' },
  'features.title': { en: 'Everything that keeps you coming back', bg: 'Всичко, което те връща обратно' },
  'features.desc': { en: 'A complete learning loop — short lessons, daily quests, streaks, and a friendly weekly league that keeps you coming back.', bg: 'Пълен учебен цикъл — кратки уроци, дневни мисии, серии и приятелска седмична лига, която те връща обратно.' },
  'features.f1.title': { en: 'Bite-sized Lessons', bg: 'Кратки уроци' },
  'features.f1.desc': { en: '5-minute lessons that pair short theory cards with interactive exercises — sliders, quizzes, and mini-simulations.', bg: '5-минутни уроци, които комбинират кратки теоретични карти с интерактивни упражнения — плъзгачи, тестове и мини-симулации.' },
  'features.f2.title': { en: 'Daily Quests', bg: 'Дневни мисии' },
  'features.f2.desc': { en: 'Earn bonus XP for completing a lesson, keeping your streak, or trying a new topic. Resets every day at midnight.', bg: 'Печели бонус XP за завършен урок, поддържана серия или нова тема. Нулира се всеки ден в полунощ.' },
  'features.f3.title': { en: 'Day Streaks', bg: 'Дневни серии' },
  'features.f3.desc': { en: 'One lesson a day keeps the streak alive — a small daily commitment that quietly builds real habits.', bg: 'Един урок на ден поддържа серията жива — малък дневен ангажимент, който тихо изгражда истински навици.' },
  'features.f4.title': { en: 'Weekly Leagues', bg: 'Седмични лиги' },
  'features.f4.desc': { en: 'Climb the Bronze, Silver, and Gold leagues by earning XP. Top 3 promote each week — friendly competition, no pay-to-win.', bg: 'Изкачвай се през Бронзовата, Сребърната и Златната лига чрез XP. Топ 3 преминават всяка седмица — приятелско съревнование, без купуване на победа.' },
  'features.f5.title': { en: 'XP & Levels', bg: 'XP и нива' },
  'features.f5.desc': { en: 'Every lesson rewards XP that levels you up from Beginner to Analyst, Investor, and beyond. Progress is visible, instantly.', bg: 'Всеки урок дава XP, което те издига от начинаещ до аналитик, инвеститор и нагоре. Прогресът е видим, мигновено.' },
  'features.f6.title': { en: 'EN & BG', bg: 'EN и BG' },
  'features.f6.desc': { en: 'Every lesson is available in English and Bulgarian, so the language never gets between you and the concept.', bg: 'Всеки урок е достъпен на английски и български, така че езикът никога не застава между теб и концепцията.' },

  // How it works
  'hiw.eyebrow': { en: 'How it works', bg: 'Как работи' },
  'hiw.title': { en: 'From sign-up to first streak in minutes', bg: 'От регистрация до първа серия за минути' },
  'hiw.desc': { en: 'No long onboarding, no boring textbook. Pick a module, tap a lesson, and learn by doing.', bg: 'Без дълга регистрация, без скучен учебник. Избери модул, тапни урок и учи чрез правене.' },
  'hiw.s1.title': { en: 'Sign up free', bg: 'Регистрирай се безплатно' },
  'hiw.s1.desc': { en: 'Create an account in seconds. No credit card, no commitment.', bg: 'Създай акаунт за секунди. Без кредитна карта, без ангажимент.' },
  'hiw.s2.title': { en: 'Pick your path', bg: 'Избери своя път' },
  'hiw.s2.desc': { en: 'From budgeting and saving to investing, credit, side hustles and insurance — start with whatever fits where you are.', bg: 'От бюджетиране и спестяване до инвестиране, кредити, странични дейности и застраховане — започни с това, което отговаря на твоята ситуация.' },
  'hiw.s3.title': { en: 'Tap a lesson', bg: 'Тапни урок' },
  'hiw.s3.desc': { en: 'Each lesson takes ~5 minutes: short theory cards followed by 3–4 interactive exercises.', bg: 'Всеки урок отнема ~5 минути: кратки теоретични карти, последвани от 3–4 интерактивни упражнения.' },
  'hiw.s4.title': { en: 'Practice for real', bg: 'Практикувай наистина' },
  'hiw.s4.desc': { en: 'Allocate a budget with sliders, pick the right index fund, decide between Avalanche and Snowball.', bg: 'Разпредели бюджет с плъзгачи, избери правилния индексен фонд, реши между Лавина и Снежна топка.' },
  'hiw.s5.title': { en: 'Earn XP & climb', bg: 'Печели XP и изкачвай се' },
  'hiw.s5.desc': { en: 'Every lesson gives XP, fuels your streak, and moves you up the weekly league.', bg: 'Всеки урок дава XP, захранва серията ти и те придвижва нагоре в седмичната лига.' },

  // Modules
  'mod.eyebrow': { en: 'Learning path', bg: 'Учебен път' },
  'mod.title': { en: 'A complete path to financial confidence.', bg: 'Пълен път към финансова увереност.' },
  'mod.desc': { en: 'A growing curriculum that takes you from "where does my money go?" to building a side hustle and protecting what you\'ve got.', bg: 'Разширяваща се учебна програма, която те води от "къде ми отиват парите?" до изграждане на странична дейност и защита на това, което имаш.' },
  'mod.mechanic': { en: 'Signature lesson', bg: 'Емблематичен урок' },
  'mod.m1.title': { en: 'Budgeting Basics', bg: 'Основи на бюджета' },
  'mod.m1.mechanic': { en: 'Build Your Budget', bg: 'Изгради бюджета си' },
  'mod.m1.desc': { en: 'Escape the rat race, master the 50/30/20 rule, and avoid the spending trap that drains most paychecks.', bg: 'Излез от безкрайната надпревара, овладей правилото 50/30/20 и избегни капана на разходите, който източва повечето заплати.' },
  'mod.m2.title': { en: 'Saving Smart', bg: 'Умно спестяване' },
  'mod.m2.mechanic': { en: 'Money Growing on Trees', bg: 'Парите растат по дърветата' },
  'mod.m2.desc': { en: 'Build your financial airbag (emergency fund), automate savings, and put compound interest to work for you.', bg: 'Изгради своята финансова въздушна възглавница (спешен фонд), автоматизирай спестяванията и накарай сложната лихва да работи за теб.' },
  'mod.m3.title': { en: 'Investing 101', bg: 'Инвестиране 101' },
  'mod.m3.mechanic': { en: 'Build Your First Portfolio', bg: 'Изгради първото си портфолио' },
  'mod.m3.desc': { en: 'Stocks, bonds, and the index fund strategy that quietly beats most professionals — explained without the jargon.', bg: 'Акции, облигации и стратегията с индексни фондове, която тихо побеждава повечето професионалисти — обяснено без жаргона.' },
  'mod.m4.title': { en: 'Credit & Debt Mastery', bg: 'Кредити и дългове' },
  'mod.m4.mechanic': { en: 'Destroy Your Debt', bg: 'Унищожи дълга си' },
  'mod.m4.desc': { en: 'Decode your credit score, choose between Avalanche and Snowball, and pay off debt without the panic.', bg: 'Разшифровай кредитния си рейтинг, избери между Лавина и Снежна топка и изплати дълга без паника.' },
  'mod.m5.title': { en: 'Side Hustles & Extra Income', bg: 'Странични дейности и допълнителни приходи' },
  'mod.m5.mechanic': { en: 'Launch Your Side Hustle', bg: 'Стартирай страничната си дейност' },
  'mod.m5.desc': { en: 'Pick an idea, validate demand, and price your first offer — extra income without quitting your day job.', bg: 'Избери идея, валидирай търсенето и определи цена на първата си оферта — допълнителен доход без да напускаш основната работа.' },
  'mod.m6.title': { en: 'Insurance Fundamentals', bg: 'Основи на застраховането' },
  'mod.m6.mechanic': { en: 'What You Actually Need', bg: 'Какво реално ти трябва' },
  'mod.m6.desc': { en: 'Cut through the noise: which policies matter, which are a waste, and how to protect what you\'ve built.', bg: 'Пробий шума: кои полици са важни, кои са загуба и как да защитиш това, което си изградил.' },

  // Trust → "Why Octolio"
  'trust.eyebrow': { en: 'Why Octolio', bg: 'Защо Octolio' },
  'trust.title': { en: 'Built to teach, not to push products', bg: 'Създадено да учи, а не да продава продукти' },
  'trust.desc': { en: 'Octolio is an education app, not a brokerage or a bank. We don\'t take a cut of your investments and we don\'t sell your data — the only thing we\'re competing for is your attention.', bg: 'Octolio е образователно приложение, а не брокер или банка. Не взимаме процент от инвестициите ти и не продаваме данните ти — единственото, за което се състезаваме, е вниманието ти.' },
  'trust.archTitle': { en: 'Honest by design', bg: 'Честно по дизайн' },
  'trust.archDesc': { en: 'Real concepts, real numbers, no get-rich-quick promises. Every lesson is reviewed for accuracy before it ships.', bg: 'Истински концепции, истински числа, без обещания за бързо забогатяване. Всеки урок преминава проверка за точност преди публикуване.' },
  'trust.progressive': { en: 'Free to start', bg: 'Безплатно за начало' },
  'trust.progressiveDesc': { en: 'The full learning path is free. PRO is optional and only unlocks extras like the AI Coach.', bg: 'Пълният учебен път е безплатен. PRO е по избор и отключва само допълнения като AI Coach.' },
  'trust.accessibility': { en: 'EN & BG, web-first', bg: 'EN и BG, уеб-базирано' },
  'trust.accessibilityDesc': { en: 'Works in any modern browser, on any device. Bulgarian translations are first-class, not an afterthought.', bg: 'Работи във всеки модерен браузър, на всяко устройство. Българските преводи са пълноценни, а не добавени накрая.' },
  'trust.ethicalTitle': { en: 'Streaks that respect your time', bg: 'Серии, които уважават времето ти' },
  'trust.ethicalDesc': { en: 'A 5-minute lesson keeps your streak alive. We won\'t guilt-trip you with notifications or push fake urgency.', bg: '5-минутен урок поддържа серията ти. Няма да те караме да се чувстваш виновен с известия или фалшива спешност.' },
  'trust.reward': { en: 'Reward', bg: 'Награда' },
  'trust.rightMove': { en: 'XP for the right answer', bg: 'XP за правилен отговор' },
  'trust.lesson': { en: 'Lesson', bg: 'Урок' },
  'trust.rightMoment': { en: 'Theory + practice, side by side', bg: 'Теория + практика, рамо до рамо' },
  'trust.ctaTitle': { en: 'Try it for 5 minutes', bg: 'Опитай 5 минути' },
  'trust.ctaDesc': { en: 'One lesson is all it takes to feel the loop. Pick a module that matches where you are right now.', bg: 'Един урок е достатъчен, за да усетиш цикъла. Избери модул, който отговаря на това, къде си сега.' },
  'trust.goToModules': { en: 'Browse Modules', bg: 'Разгледай модулите' },

  // FAQ
  'faq.eyebrow': { en: 'FAQ', bg: 'ЧЗВ' },
  'faq.title': { en: 'Frequently Asked Questions', bg: 'Често задавани въпроси' },
  'faq.desc': { en: 'Quick answers about how the app works, what it costs, and what you\'ll actually learn.', bg: 'Бързи отговори за това как работи приложението, колко струва и какво реално ще научиш.' },
  'faq.q1': { en: 'How long does a lesson take?', bg: 'Колко време отнема един урок?' },
  'faq.a1': { en: 'About 5 minutes. Each lesson opens with a couple of short theory cards, then 3–4 interactive exercises (sliders, quizzes, mini-simulations) and ends with XP and a streak update.', bg: 'Около 5 минути. Всеки урок започва с няколко кратки теоретични карти, после 3–4 интерактивни упражнения (плъзгачи, тестове, мини-симулации) и завършва с XP и обновяване на серията.' },
  'faq.q2': { en: 'Is Octolio free?', bg: 'Octolio безплатно ли е?' },
  'faq.a2': { en: 'Yes. The full learning path, daily quests, and weekly leagues are free. PRO is optional and unlocks extras like the AI Coach.', bg: 'Да. Пълният учебен път, дневните мисии и седмичните лиги са безплатни. PRO е по избор и отключва допълнения като AI Coach.' },
  'faq.q3': { en: 'Do I need any finance background?', bg: 'Трябва ли ми финансов опит?' },
  'faq.a3': { en: 'Not at all. Module 1 (Budgeting Basics) starts from zero. If you can split a restaurant bill, you can start the first lesson.', bg: 'Изобщо не. Модул 1 (Основи на бюджета) започва от нула. Ако можеш да разделиш сметка в ресторант, можеш да започнеш първия урок.' },
  'faq.q4': { en: 'Will Octolio give me investment advice?', bg: 'Ще ми дава ли Octolio инвестиционни съвети?' },
  'faq.a4': { en: 'No — Octolio is education, not advice. We teach the concepts and tools so you can make your own informed decisions (or know which questions to ask a professional).', bg: 'Не — Octolio е образование, а не съвет. Учим концепциите и инструментите, за да можеш да взимаш свои информирани решения (или да знаеш какви въпроси да зададеш на професионалист).' },
  'faq.q5': { en: 'Is it available in Bulgarian?', bg: 'Достъпно ли е на български?' },
  'faq.a5': { en: 'Yes. Every lesson, quest, and exercise is fully translated into Bulgarian — toggle the language anytime from the top bar.', bg: 'Да. Всеки урок, мисия и упражнение са напълно преведени на български — превключи езика по всяко време от горната лента.' },

  // CTA
  'cta.eyebrow': { en: 'Ready when you are', bg: 'Готови когато си готов' },
  'cta.title': { en: 'Your first lesson is 5 minutes away.', bg: 'Първият ти урок е на 5 минути разстояние.' },
  'cta.desc': { en: 'Sign up free, pick Budgeting Basics, and earn your first XP today. No credit card, no commitment.', bg: 'Регистрирай се безплатно, избери Основи на бюджета и спечели първия си XP още днес. Без кредитна карта, без ангажимент.' },
  'cta.email': { en: 'Email', bg: 'Имейл' },
  'cta.placeholder': { en: 'name@example.com', bg: 'име@пример.com' },
  'cta.submit': { en: 'Launch the App', bg: 'Стартирай приложението' },
  'cta.disclaimer': { en: 'Opens app.octolio.me in a new tab. Free to start.', bg: 'Отваря app.octolio.me в нов раздел. Безплатно за начало.' },
  'cta.thanks': { en: 'Opening Octolio…', bg: 'Отваряме Octolio…' },

  // Footer
  'footer.desc': { en: 'Bite-sized financial lessons that turn money skills into a daily habit.', bg: 'Кратки финансови уроци, които превръщат умението с пари в дневен навик.' },
  'footer.contact': { en: 'Contact', bg: 'Контакти' },
  'footer.copy': { en: 'All rights reserved.', bg: 'Всички права запазени.' },

  // About page
  'aboutPage.badge': { en: 'Our Story', bg: 'Нашата история' },
  'aboutPage.title1': { en: 'Building the future of', bg: 'Изграждаме бъдещето на' },
  'aboutPage.title2': { en: 'financial education.', bg: 'финансовото образование.' },
  'aboutPage.subtitle': { en: 'We believe everyone deserves the tools to make smart financial decisions — and that learning shouldn\'t feel like a chore.', bg: 'Вярваме, че всеки заслужава инструментите за вземане на умни финансови решения — и че ученето не трябва да е задължение.' },
  'aboutPage.teamMembers': { en: 'Team Members', bg: 'Членове на екипа' },
  'aboutPage.learningModules': { en: 'Min per lesson', bg: 'Минути на урок' },
  'aboutPage.sharedMission': { en: 'Shared Mission', bg: 'Обща мисия' },
  'aboutPage.howStarted': { en: 'How It Started', bg: 'Как започна' },
  'aboutPage.originTitle': { en: 'From a school idea to a shipped app.', bg: 'От училищна идея до работещо приложение.' },
  'aboutPage.problemTitle': { en: 'The Problem We Saw', bg: 'Проблемът, който видяхме' },
  'aboutPage.problemDesc': { en: 'In 2024, a group of students from the same school — each with different interests in design, engineering, psychology, and finance — kept running into the same wall: despite years of education, none of them felt truly prepared to handle money. Budgeting, saving, investing, insurance — the real-world financial skills that matter most were never taught in any classroom. So they decided to do something about it.', bg: 'През 2024 г. група ученици от едно и също училище — всеки с различни интереси в дизайна, инженерството, психологията и финансите — продължаваха да се сблъскват с една и съща стена: въпреки годините образование, никой от тях не се чувстваше наистина подготвен да управлява пари. Бюджетиране, спестяване, инвестиране, застраховане — реалните финансови умения, които са най-важни, никога не бяха преподавани в класната стая. Затова решиха да направят нещо по въпроса.' },
  'aboutPage.sparkTitle': { en: 'The Spark 💡', bg: 'Искрата 💡' },
  'aboutPage.sparkDesc': { en: 'During a late-night session, one of us said: "Why can\'t learning about money actually feel good — short lessons, a streak you don\'t want to break, and progress you can actually see?" That question became the seed of Octolio. The problem wasn\'t a lack of information — it was a lack of engagement. So we set out to build a loop designed around how habits really form, and point it at the financial decisions that shape the rest of your life.', bg: 'По време на късна сесия, един от нас каза: "Защо ученето за пари не може просто да е приятно — кратки уроци, серия, която не искаш да прекъснеш, и прогрес, който реално виждаш?" Този въпрос се превърна в семето на Octolio. Проблемът не е липсата на информация — а липсата на ангажираност. Затова се заехме да изградим цикъл, проектиран около това как навиците наистина се формират, и да го насочим към финансовите решения, които оформят останалата част от живота ти.' },
  'aboutPage.missionTitle': { en: 'The Mission 🎯', bg: 'Мисията 🎯' },
  'aboutPage.missionDesc': { en: 'Octolio was born from a simple belief: financial literacy should be a practice, not a lecture. We set out to build a platform where users learn by doing — making real budgeting decisions, choosing index funds, decoding credit scores — in 5-minute sessions that fit into a normal day. No dark patterns, no get-rich-quick promises, no toxic competition. Just meaningful progress toward real financial confidence.', bg: 'Octolio се роди от просто убеждение: финансовата грамотност трябва да е практика, а не лекция. Заехме се да изградим платформа, в която потребителите учат чрез правене — взимайки реални бюджетни решения, избирайки индексни фондове, разшифровайки кредитни рейтинги — в 5-минутни сесии, които се вписват в обичайния ден. Без тъмни модели, без обещания за бързо забогатяване, без токсична конкуренция. Само смислен прогрес към реална финансова увереност.' },
  'aboutPage.nowTitle': { en: 'Where We Are Now 🚀', bg: 'Къде сме сега 🚀' },
  'aboutPage.nowDesc': { en: 'Today, Octolio is live at app.octolio.me — a growing library of interactive lessons, daily quests, and a weekly league, all free to start. We\'re shipping new lessons regularly and refining the learning loop based on how real learners actually use it. Our goal: help anyone go from "financially anxious" to "financially confident," one lesson at a time.', bg: 'Днес Octolio е достъпно на app.octolio.me — разширяваща се библиотека от интерактивни уроци, дневни мисии и седмична лига, всичко безплатно за начало. Редовно публикуваме нови уроци и усъвършенстваме учебния цикъл въз основа на това как реалните учащи го използват. Нашата цел: да помогнем на всеки да премине от "финансово тревожен" към "финансово уверен", един урок наведнъж.' },
  'aboutPage.teamEyebrow': { en: 'The Team', bg: 'Екипът' },
  'aboutPage.teamTitle': { en: 'The people behind the app.', bg: 'Хората зад приложението.' },
  'aboutPage.teamDesc': { en: 'A multidisciplinary team united by one goal: making financial literacy accessible, engaging, and lasting.', bg: 'Мултидисциплинарен екип, обединен от една цел: финансовата грамотност да е достъпна, ангажираща и трайна.' },
  'aboutPage.ctaTitle': { en: 'Ready to start your first lesson?', bg: 'Готов ли си да започнеш първия си урок?' },
  'aboutPage.ctaDesc': { en: 'Five minutes. One streak. A whole new relationship with money.', bg: 'Пет минути. Една серия. Цяла нова връзка с парите.' },
  'aboutPage.backHome': { en: 'Back to Home', bg: 'Обратно към началото' },

  // Team roles
  'team.bh.role': { en: 'Co-Founder & Lead Designer', bg: 'Съосновател и водещ дизайнер' },
  'team.bh.bio': { en: 'Passionate about making complex financial concepts approachable through thoughtful design and gamification.', bg: 'Страстен към превръщането на сложните финансови концепции в достъпни чрез внимателен дизайн и геймификация.' },
  'team.kn.role': { en: 'Co-Founder & Lead Developer', bg: 'Съосновател и водещ разработчик' },
  'team.kn.bio': { en: 'Full-stack engineer obsessed with building systems that teach through experience, not lectures.', bg: 'Full-stack инженер, обсебен от изграждането на системи, които учат чрез опит, а не лекции.' },
  'team.nn.role': { en: 'Product Strategist', bg: 'Продуктов стратег' },
  'team.nn.bio': { en: 'Bridges the gap between behavioral psychology and product design to create experiences that stick.', bg: 'Свързва поведенческата психология с продуктовия дизайн, за да създава запомнящи се преживявания.' },
  'team.ns.role': { en: 'Content & Curriculum Lead', bg: 'Ръководител на съдържание и учебна програма' },
  'team.ns.bio': { en: 'Designs the learning paths and ensures every lesson drives real-world impact.', bg: 'Проектира учебните пътеки и гарантира, че всеки урок има реално въздействие.' },
  'team.sk.role': { en: 'Engineering & Infrastructure', bg: 'Инженерство и инфраструктура' },
  'team.sk.bio': { en: 'Builds the simulation engine and data pipelines that power adaptive learning across the platform.', bg: 'Изгражда симулационния двигател и данните, които захранват адаптивното учене в платформата.' },
  'team.ms.role': { en: 'Lead Developer', bg: 'Водещ разработчик' },
  'team.ms.bio': { en: 'Leads the development of the Octolio website and platform, turning design vision into a polished, performant experience.', bg: 'Ръководи разработката на уебсайта и платформата на Octolio, превръщайки дизайнерската визия в изпипано и производително преживяване.' },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang((l) => (l === 'en' ? 'bg' : 'en'))
  const t = (key: string) => translations[key]?.[lang] ?? key

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
