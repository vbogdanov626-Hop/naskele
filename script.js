const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const langBtns = document.querySelectorAll(".lang-btn");
const languageSelect = document.getElementById("languageSelect");
const contactForm = document.getElementById("contactForm");
const contactNote = document.getElementById("contactNote");
const forumForm = document.getElementById("forumForm");
const forumNote = document.getElementById("forumNote");
const forumList = document.getElementById("forumList");
const FORUM_POSTS_KEY = "churchForumPosts";

// Test localStorage availability
try {
  localStorage.setItem("test", "test");
  localStorage.removeItem("test");
  console.log("localStorage is available");
} catch (e) {
  console.error("localStorage is not available:", e);
}

const translations = {
  uk: {
    pageTitle: "На скелі | Християнська церква",
    logoAria: "На скелі - головна",
    menu: "Меню",
    logoText: "На скелі",
    navHome: "Головна",
    navAbout: "Про нас",
    navServices: "Служіння",
    navSermons: "Проповіді",
    navTestimonials: "Свідчення",
    navContacts: "Контакти",
    langLabel: "Мова",
    heroTitle: "«Збудую Церкву Мою на цій скелі»",
    heroQuote: "«Господь — скеля моя, і твердиня моя, і визволитель мій!»",
    heroText: "Ласкаво просимо до громади, де кожен знаходить надію, молитву та підтримку у Христі.",
    heroBtnJoin: "Долучитися",
    quotesTitle: "Біблійні цитати",
    quote1: "«Господь - скеля моя, і твердиня моя, і визволитель мій!»",
    quote1Ref: "Псалом 18:3",
    quote2: "«Прийдіть до Мене, усі струджені та обтяжені, і Я вас заспокою!»",
    quote2Ref: "Матвія 11:28",
    quote3: "«Ісус Христос учора, і сьогодні, і навіки Той Самий!»",
    quote3Ref: "Євреїв 13:8",
    quote4: "«Господь - пастир мій; я ні в чому не буду потребувати.»",
    quote4Ref: "Псалом 23:1",
    quote5: "«Бо Я знаю думки, які думаю про вас, - думки про мир, а не про лихо...»",
    quote5Ref: "Єремія 29:11",
    quote6: "«Все можу в Тому, Хто мене зміцнює.»",
    quote6Ref: "Филип'ян 4:13",
    aboutTitle: "Про нас",
    aboutDesc: "Церква «На скелі» — це місце, де люди знаходять духовну підтримку, спілкування та зростання у вірі. Ми прагнемо до того, щоб кожен відчув любов Божу та знайшов своє місце у громаді.",
    aboutHistoryTitle: "Історія нашої церкви",
    aboutHistoryText: "Церква «На скелі» була заснована в 2025 році як невелика молитвена група українських сімей у Німеччині. За ці роки ми виросли у теплу духовну громаду, відкриту для всіх, хто шукає Бога. Наша церква названа на честь слів Ісуса Христа: «На цій скелі Я збудую Церкву Мою» (Матвія 16:18), символізуючи тверду віру та надію.",
    aboutCommunityText: "Сьогодні ми — це міжнародна громада, що об'єднує людей різних національностей та культур. Ми проводимо служіння трьома мовами і прагнемо створювати атмосферу, де кожен почувається як вдома. Наша церква активно бере участь у соціальній роботі, допомагаючи нужденним та підтримуючи місіонерські проекти.",
    aboutMissionTitle: "Місія та цінності",
    aboutMissionText: "Наша місія — проголошувати Ісуса Христа, будувати міцні стосунки з Богом і один з одним, служити суспільству та допомагати людям знайти сенс життя у Христі.",
    value1: "Віра в Боже Слово як основа життя",
    value2: "Любов та служіння ближнім",
    value3: "Молитва, учнівство та єдність громади",
    value4: "Надія та натхнення для кожного",
    value5: "Відкритість та гостинність",
    value6: "Зростання у вірі через вивчення Біблії",
    aboutImg1Alt: "Гори в променях світла",
    aboutImg2Alt: "Християнська спільнота на служінні",
    sermonsTitle: "Проповіді",
    sermon1Title: "Життя на твердій скелі",
    sermon1Meta: "14 квітня 2026",
    sermon1Desc: "Про те, як зберігати віру в час випробувань та довіряти Богу у щоденному житті.",
    sermon3Title: "Любов як шлях",
    sermon3Meta: "31 березня 2026",
    sermon3Desc: "Дослідження біблійного розуміння любові. Як любов Бога змінює наші стосунки та життя.",
    sermon4Title: "Молитва і сила віри",
    sermon4Meta: "24 березня 2026",
    sermon4Desc: "Як молитва зміцнює нашу віру та допомагає долати труднощі. Практичні поради щодо розвитку молитвенного життя.",
    servicesTitle: "Служіння",
    service1Title: "Недільне служіння",
    service1Desc: "Спільна молитва, поклоніння та проповідь Божого Слова.",
    service2Title: "Воскресна школа",
    service2Desc: "Біблійні уроки для дітей та підлітків у дружній християнській атмосфері.",
    service4Title: "Молитвена зустріч",
    service4Time: "Кожну середу о 19:00",
    service4Desc: "Зібрання для спільної молитви, читання Біблії та підтримки один одного. Приходьте поділитися своїми потребами та подякувати Богу.",
    service5Title: "Біблійний гурток",
    service5Time: "Кожен вівторок о 18:00",
    service5Desc: "Вивчення Біблії у малих групах. Глибоке занурення у Слово Боже, обговорення та застосування у житті.",
    service6Title: "Сімейне служіння",
    service6Time: "Перша неділя місяця о 15:00",
    service6Desc: "Особливе служіння для сімей з дітьми. Ігри, уроки та поклоніння, адаптовані для всіх віків.",
    contactsTitle: "Контакти",
    addressLabel: "Адреса:",
    phoneLabel: "Телефон:",
    emailLabel: "Email:",
    mapTitle: "Карта розташування церкви",
    contactInfoTitle: "Контактна інформація",
    pastorLabel: "Пастор:",
    contactAddress: "Niemeierstraße 9, 32758 Detmold, Germany",
    contactEmail: "info@naskeli.org",
    contactPhone: "+4915110057600",
    contactPastor: "Олександр",
    officeHoursLabel: "Години роботи офісу:",
    socialTitle: "Ми у соціальних мережах",
    socialDesc: "Слідкуйте за нашими оновленнями, проповідями та заходами у соціальних мережах.",
    shareTitle: "Поділитися сайтом",
    shareDesc: "Допоможіть іншим дізнатися про нашу церкву.",
    contactFormTitle: "Зворотний зв'язок",
    nameLabel: "Ім'я",
    emailInputLabel: "Email",
    messageLabel: "Повідомлення",
    sendBtn: "Надіслати",
    sermon2Title: "Світ Христов у темряві",
    sermon2Meta: "7 квітня 2026",
    sermon2Desc: "Натхнення залишатися світлом для світу, зберігаючи мир і любов у серці. Як бути свідками Христа у сучасному світі.",
    sermon1VideoTitle: "Проповідь: Життя на твердому скелі",
    sermon2VideoTitle: "Проповідь: Світ Христов у темряві",
    sermon3VideoTitle: "Проповідь: Любов як шлях",
    sermon4VideoTitle: "Проповідь: Молитва і сила віри",
    service1Time: "Щонеділі о 16:00",
    service2Time: "Щонеділі о 16:00",
    contactFormDesc: "Маєте запитання? Хочете приєднатися до нас? Напишіть нам!",
    donationsTitle: "Онлайн-пожертви",
    donationIntro: "Ви можете підтримати служіння церкви «На скелі». Дякуємо за вашу любов і відкритість серця.",
    donorLabel: "Ваше ім'я",
    amountLabel: "Сума (EUR)",
    methodLabel: "Спосіб",
    methodChoose: "Оберіть спосіб",
    methodCard: "Банківська картка",
    methodBank: "Банківський переказ",
    supportBtn: "Підтримати",
    footerCopy: "© 2026 Християнська церква «На скелі». Усі права захищено.",
    footerLocale: "Мова сайту: Українська / Deutsch / Русский",
    contactSent: "Дякуємо! Ваше повідомлення отримано. Ми зв'яжемося з вами найближчим часом.",
    donationSent: "Щиро дякуємо за вашу підтримку ({amount} EUR)! Нехай Господь благословить вас.",
    forumTitle: "Свідчення",
    forumIntro: "Діліться свідченнями, проханнями про молитву та підтримуйте один одного.",
    forumFormTitle: "Залиште своє свідчення",
    forumAuthorLabel: "Ім'я",
    forumTopicLabel: "Тема",
    forumMessageLabel: "Повідомлення",
    forumPostButton: "Опублікувати",
    forumPosted: "Повідомлення додано.",
    forumEmpty: "Поки що немає повідомлень.",
    forumBy: "Автор",
  },
  de: {
    pageTitle: "Auf dem Felsen | Christliche Kirche",
    logoAria: "Auf dem Felsen - Startseite",
    menu: "Menü",
    logoText: "Auf dem Felsen",
    navHome: "Start",
    navAbout: "Über uns",
    navServices: "Gottesdienste",
    navSermons: "Predigten",
    navTestimonials: "Zeugnisse",
    navContacts: "Kontakt",
    langLabel: "Sprache",
    heroTitle: "„Ich werde meine Kirche auf diesen Felsen bauen“",
    heroQuote: "„Der Herr ist mein Fels, meine Festung und mein Befreier!“",
    heroText: "Willkommen in einer Gemeinde, in der jeder Hoffnung, Gebet und Unterstützung in Christus findet.",
    heroBtnJoin: "Mehr erfahren",
    quotesTitle: "Bibelverse",
    quote1: "„Der Herr ist mein Fels, meine Festung und mein Befreier!“",
    quote1Ref: "Psalm 18:3",
    quote2: "„Kommt her zu mir, alle, die ihr mühselig und beladen seid, so will ich euch erquicken.“",
    quote2Ref: "Matthäus 11:28",
    quote3: "„Jesus Christus ist derselbe gestern und heute und in Ewigkeit.“",
    quote3Ref: "Hebräer 13:8",
    quote4: "„Der Herr ist mein Hirte; mir wird nichts mangeln.“",
    quote4Ref: "Psalm 23:1",
    quote5: "„Denn ich weiß wohl, was ich für Gedanken über euch habe, spricht der HERR, Gedanken des Friedens und nicht des Unheils...“",
    quote5Ref: "Jeremia 29:11",
    quote6: "„Ich vermag alles durch den, der mich mächtig macht, Christus.“",
    quote6Ref: "Philipper 4:13",
    aboutTitle: "Über uns",
    aboutDesc: "Die Kirche „Auf dem Felsen“ ist ein Ort, an dem Menschen spirituelle Unterstützung, Gemeinschaft und Wachstum im Glauben finden. Wir streben danach, dass jeder die Liebe Gottes spürt und seinen Platz in der Gemeinde findet.",
    aboutHistoryTitle: "Geschichte unserer Kirche",
    aboutHistoryText: "Die Kirche „Auf dem Felsen“ wurde 2025 als kleine Gebetsgruppe ukrainischer Familien in Deutschland gegründet. In diesen Jahren sind wir zu einer herzlichen geistlichen Gemeinschaft gewachsen, die offen für alle ist, die Gott suchen. Unsere Kirche ist nach den Worten Jesu Christi benannt: „Auf diesen Felsen werde ich meine Kirche bauen“ (Matthäus 16:18), was feste Glaube und Hoffnung symbolisiert.",
    aboutCommunityText: "Heute sind wir eine internationale Gemeinschaft, die Menschen verschiedener Nationalitäten und Kulturen vereint. Wir führen Gottesdienste in drei Sprachen durch und bemühen uns, eine Atmosphäre zu schaffen, in der sich jeder zu Hause fühlt. Unsere Kirche engagiert sich aktiv in sozialer Arbeit, hilft Bedürftigen und unterstützt Missionsprojekte.",
    aboutMissionTitle: "Mission und Werte",
    aboutMissionText: "Unsere Mission ist es, Jesus Christus zu verkündigen, starke Beziehungen zu Gott und untereinander aufzubauen, der Gesellschaft zu dienen und Menschen zu helfen, Sinn im Leben in Christus zu finden.",
    value1: "Glaube an das Wort Gottes als Grundlage des Lebens",
    value2: "Liebe und Dienst am Nächsten",
    value3: "Gebet, Jüngerschaft und Einheit der Gemeinde",
    value4: "Hoffnung und Inspiration für jeden",
    value5: "Offenheit und Gastfreundschaft",
    value6: "Wachstum im Glauben durch Bibelstudium",
    aboutImg1Alt: "Berge im Licht",
    aboutImg2Alt: "Christliche Gemeinschaft im Gottesdienst",
    sermonsTitle: "Predigten",
    sermon1Title: "Leben auf festem Felsen",
    sermon1Meta: "14. April 2026",
    sermon1Desc: "Darüber, wie man im Glauben bleibt und Gott im Alltag vertraut.",
    sermon3Title: "Liebe als Weg",
    sermon3Meta: "31. März 2026",
    sermon3Desc: "Erkundung des biblischen Verständnisses von Liebe. Wie Gottes Liebe unsere Beziehungen und unser Leben verändert.",
    sermon4Title: "Gebet und Kraft des Glaubens",
    sermon4Meta: "24. März 2026",
    sermon4Desc: "Wie Gebet unseren Glauben stärkt und hilft, Schwierigkeiten zu überwinden. Praktische Tipps zur Entwicklung des Gebetslebens.",
    servicesTitle: "Gottesdienste",
    service1Title: "Sonntagsgottesdienst",
    service1Desc: "Gemeinsames Gebet, Lobpreis und Predigt des Wortes Gottes.",
    service2Title: "Sonntagsschule",
    service2Desc: "Bibelunterricht für Kinder und Jugendliche in einer freundlichen christlichen Atmosphäre.",
    service4Title: "Gebetsstunde",
    service4Time: "Jeden Mittwoch um 19:00",
    service4Desc: "Treffen für gemeinsames Gebet, Bibellesen und gegenseitige Unterstützung. Kommen Sie, um Ihre Bedürfnisse zu teilen und Gott zu danken.",
    service5Title: "Bibelkreis",
    service5Time: "Jeden Dienstag um 18:00",
    service5Desc: "Bibelstudium in kleinen Gruppen. Tiefes Eintauchen in Gottes Wort, Diskussion und Anwendung im Leben.",
    service6Title: "Familiengottesdienst",
    service6Time: "Erster Sonntag im Monat um 15:00",
    service6Desc: "Besonderer Gottesdienst für Familien mit Kindern. Spiele, Lektionen und Anbetung, angepasst an alle Altersgruppen.",
    contactsTitle: "Kontakt",
    addressLabel: "Adresse:",
    emailLabel: "E-Mail:",
    phoneLabel: "Telefon:",
    mapTitle: "Standort der Kirche auf der Karte",
    contactInfoTitle: "Kontaktinformationen",
    pastorLabel: "Pastor:",
    contactAddress: "Niemeierstraße 9, 32758 Detmold, Germany",
    contactEmail: "info@naskeli.org",
    contactPhone: "+4915110057600",
    contactPastor: "Alexander",
    officeHoursLabel: "Bürozeiten:",
    socialTitle: "Wir in sozialen Netzwerken",
    socialDesc: "Folgen Sie unseren Updates, Predigten und Veranstaltungen in sozialen Netzwerken.",
    contactFormTitle: "Kontaktformular",
    nameLabel: "Name",
    emailInputLabel: "E-Mail",
    messageLabel: "Nachricht",
    sendBtn: "Absenden",
    sermon2Title: "Licht Christi in der Dunkelheit",
    sermon2Meta: "7. April 2026",
    sermon2Desc: "Inspiration, ein Licht für die Welt zu bleiben und Frieden sowie Liebe im Herzen zu bewahren. Wie man Zeuge Christi in der modernen Welt ist.",
    sermon1VideoTitle: "Predigt: Leben auf festem Felsen",
    sermon2VideoTitle: "Predigt: Licht Christi in der Dunkelheit",
    sermon3VideoTitle: "Predigt: Liebe als Weg",
    sermon4VideoTitle: "Predigt: Gebet und Kraft des Glaubens",
    service1Time: "Jeden Sonntag um 16:00",
    service2Time: "Jeden Sonntag um 16:00",
    contactFormDesc: "Haben Sie Fragen? Möchten Sie sich uns anschließen? Schreiben Sie uns!",
    donationsTitle: "Online-Spenden",
    donationIntro: "Sie können den Dienst der Kirche „Auf dem Felsen“ unterstützen. Vielen Dank fur Ihre Liebe und offene Herzen.",
    donorLabel: "Ihr Name",
    amountLabel: "Betrag (EUR)",
    methodLabel: "Methode",
    methodChoose: "Methode wählen",
    methodCard: "Bankkarte",
    methodBank: "Bankuberweisung",
    supportBtn: "Unterstutzen",
    footerCopy: "© 2026 Christliche Kirche „Auf dem Felsen“. Alle Rechte vorbehalten.",
    footerLocale: "Website-Sprache: Ukrainisch / Deutsch / Russisch",
    contactSent: "Vielen Dank! Ihre Nachricht wurde gesendet. Wir melden uns in Kurze bei Ihnen.",
    donationSent: "Vielen Dank fur Ihre Unterstutzung ({amount} EUR)! Gott segne Sie.",
    forumTitle: "Zeugnisse",
    forumIntro: "Teilen Sie Zeugnisse, Gebetsanliegen und unterstützen Sie einander.",
    forumFormTitle: "Teilen Sie Ihr Zeugnis",
    forumAuthorLabel: "Name",
    forumTopicLabel: "Thema",
    forumMessageLabel: "Nachricht",
    forumPostButton: "Veröffentlichen",
    forumPosted: "Beitrag wurde hinzugefügt.",
    forumEmpty: "Noch keine Beiträge.",
    forumBy: "Autor",
  },
  ru: {
    pageTitle: "На скале | Христианская церковь",
    logoAria: "На скале - главная",
    menu: "Меню",
    logoText: "На скале",
    navHome: "Главная",
    navAbout: "О нас",
    navServices: "Служения",
    navSermons: "Проповеди",
    navTestimonials: "Свидетельства",
    navContacts: "Контакты",
    langLabel: "Язык",
    heroTitle: "«Создам Церковь Мою на этой скале»",
    heroQuote: "«Господь — скала моя, и твердыня моя, и избавитель мой!»",
    heroText: "Добро пожаловать в общину, где каждый находит надежду, молитву и поддержку во Христе.",
    heroBtnJoin: "Присоединиться",
    quotesTitle: "Библейские цитаты",
    quote1: "«Господь - скала моя, и твердыня моя, и избавитель мой!»",
    quote1Ref: "Псалом 18:3",
    quote2: "«Придите ко Мне, все труждающиеся и обремененные, и Я успокою вас!»",
    quote2Ref: "Матфея 11:28",
    quote3: "«Иисус Христос вчера и сегодня и во веки Тот же!»",
    quote3Ref: "Евреям 13:8",
    quote4: "«Господь — Пастырь мой; я ни в чем не буду нуждаться.»",
    quote4Ref: "Псалом 23:1",
    quote5: "«Ибо Я знаю намерения, какие имею о вас, говорит Господь, намерения во благо, а не на зло...»",
    quote5Ref: "Иеремия 29:11",
    quote6: "«Все могу в укрепляющем меня Христе.»",
    quote6Ref: "Филиппийцам 4:13",
    aboutTitle: "О нас",
    aboutDesc: "Церковь «На скале» — это место, где люди находят духовную поддержку, общение и рост в вере. Мы стремимся к тому, чтобы каждый почувствовал любовь Божью и нашел свое место в общине.",
    aboutHistoryTitle: "История нашей церкви",
    aboutHistoryText: "Церковь «На скале» была основана в 2025 году как небольшая молитвенная группа украинских семей в Германии. За эти годы мы выросли в теплую духовную общину, открытую для всех, кто ищет Бога. Наша церковь названа в честь слов Иисуса Христа: «На этой скале Я создам Церковь Мою» (Матфея 16:18), символизируя твердую веру и надежду.",
    aboutCommunityText: "Сегодня мы — это международная община, объединяющая людей разных национальностей и культур. Мы проводим служения на трех языках и стремимся создавать атмосферу, где каждый чувствует себя дома. Наша церковь активно участвует в социальной работе, помогая нуждающимся и поддерживая миссионерские проекты.",
    aboutMissionTitle: "Миссия и ценности",
    aboutMissionText: "Наша миссия — провозглашать Иисуса Христа, строить крепкие отношения с Богом и друг с другом, служить обществу и помогать людям найти смысл жизни во Христе.",
    value1: "Вера в Божье Слово как основу жизни",
    value2: "Любовь и служение ближним",
    value3: "Молитва, ученичество и единство общины",
    value4: "Надежда и вдохновение для каждого",
    value5: "Открытость и гостеприимство",
    value6: "Рост в вере через изучение Библии",
    aboutImg1Alt: "Горы в лучах света",
    aboutImg2Alt: "Христианская община на служении",
    sermonsTitle: "Проповеди",
    sermon1Title: "Жизнь на твердой скале",
    sermon1Meta: "14 апреля 2026",
    sermon1Desc: "О том, как сохранять веру в испытаниях и доверять Богу в повседневной жизни.",
    sermon3Title: "Любовь как путь",
    sermon3Meta: "31 марта 2026",
    sermon3Desc: "Исследование библейского понимания любви. Как любовь Бога меняет наши отношения и жизнь.",
    sermon4Title: "Молитва и сила веры",
    sermon4Meta: "24 марта 2026",
    sermon4Desc: "Как молитва укрепляет нашу веру и помогает преодолевать трудности. Практические советы по развитию молитвенной жизни.",
    servicesTitle: "Служения",
    service1Title: "Воскресное служение",
    service1Desc: "Общая молитва, поклонение и проповедь Божьего Слова.",
    service2Title: "Воскресная школа",
    service2Desc: "Библейские занятия для детей и подростков в дружелюбной христианской атмосфере.",
    service3Title: "Молодежная встреча",
    service3Desc: "Библейские обсуждения, общение и служение молодежи.",
    service4Title: "Молитвенная встреча",
    service4Time: "Каждую среду в 19:00",
    service4Desc: "Собрание для совместной молитвы, чтения Библии и поддержки друг друга. Приходите поделиться своими нуждами и поблагодарить Бога.",
    service5Title: "Библейский кружок",
    service5Time: "Каждый вторник в 18:00",
    service5Desc: "Изучение Библии в малых группах. Глубокое погружение в Слово Божье, обсуждение и применение в жизни.",
    service6Title: "Семейное служение",
    service6Time: "Первое воскресенье месяца в 15:00",
    service6Desc: "Специальное служение для семей с детьми. Игры, уроки и поклонение, адаптированные для всех возрастов.",
    contactsTitle: "Контакты",
    addressLabel: "Адрес:",
    emailLabel: "Email:",
    phoneLabel: "Телефон:",
    mapTitle: "Расположение церкви на карте",
    contactAddress: "Niemeierstraße 9, 32758 Detmold, Germany",
    contactEmail: "info@naskeli.org",
    contactPhone: "+4915110057600",
    contactPastor: "Александр",
    officeHoursLabel: "Часы работы офиса:",
    socialTitle: "Мы в социальных сетях",
    socialDesc: "Следите за нашими обновлениями, проповедями и мероприятиями в социальных сетях.",
    contactFormTitle: "Обратная связь",
    nameLabel: "Имя",
    emailInputLabel: "Email",
    messageLabel: "Сообщение",
    sendBtn: "Отправить",
    sermon2Title: "Свет Христов во тьме",
    sermon2Meta: "7 апреля 2026",
    sermon2Desc: "Вдохновение оставаться светом для мира, сохраняя мир и любовь в сердце. Как быть свидетелем Христа в современном мире.",
    sermon1VideoTitle: "Проповедь: Жизнь на твердой скале",
    sermon2VideoTitle: "Проповедь: Свет Христов во тьме",
    sermon3VideoTitle: "Проповедь: Любовь как путь",
    sermon4VideoTitle: "Проповедь: Молитва и сила веры",
    service1Time: "Каждое воскресенье в 16:00",
    service2Time: "Каждое воскресенье в 16:00",
    contactFormDesc: "Есть вопросы? Хотите присоединиться к нам? Напишите нам!",
    donationsTitle: "Онлайн-пожертвования",
    donationIntro: "Вы можете поддержать служение церкви «На скале». Спасибо за вашу любовь и открытость сердца.",
    donorLabel: "Ваше имя",
    amountLabel: "Сумма (EUR)",
    methodLabel: "Способ",
    methodChoose: "Выберите способ",
    methodCard: "Банковская карта",
    methodBank: "Банковский перевод",
    supportBtn: "Поддержать",
    footerCopy: "© 2026 Христианская церковь «На скале». Все права защищены.",
    footerLocale: "Язык сайта: Українська / Deutsch / Русский",
    contactSent: "Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.",
    donationSent: "Спасибо за вашу поддержку ({amount} EUR)! Да благословит вас Господь.",
    forumTitle: "Свидетельства",
    forumIntro: "Делитесь свидетельствами, молитвенными нуждами и поддерживайте друг друга.",
    forumFormTitle: "Оставьте свое свидетельство",
    forumAuthorLabel: "Имя",
    forumTopicLabel: "Тема",
    forumMessageLabel: "Сообщение",
    forumPostButton: "Опубликовать",
    forumPosted: "Сообщение добавлено.",
    forumEmpty: "Пока нет сообщений.",
    forumBy: "Автор",
  },
};

let currentLanguage = localStorage.getItem("siteLanguage") || "uk";
if (!translations[currentLanguage]) {
  currentLanguage = "uk";
}

const applyLanguage = (lang) => {
  const dictionary = translations[lang] || translations.uk;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.dataset.i18nTitle;
    if (dictionary[key]) {
      element.setAttribute("title", dictionary[key]);
    }
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    if (dictionary[key]) {
      element.setAttribute("alt", dictionary[key]);
    }
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (dictionary[key]) {
      element.setAttribute("aria-label", dictionary[key]);
    }
  });
  document.title = dictionary.pageTitle;
  localStorage.setItem("siteLanguage", lang);
  currentLanguage = lang;
  if (languageSelect) {
    languageSelect.value = lang;
  }
  // Update language buttons
  langBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  renderBibleQuotes(lang);
  renderForumPosts();
  updateAdminLink();
};

// Make renderForumPosts globally available
window.renderForumPosts = renderForumPosts;

// Admin functions
window.updateAdminLink = function() {
  const adminLink = document.getElementById("adminLink");
  const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  console.log("Admin status check:", isLoggedIn);
  if (adminLink) {
    adminLink.style.display = isLoggedIn ? "block" : "none";
    console.log("Admin link visibility set to:", isLoggedIn ? "visible" : "hidden");
  } else {
    console.log("Admin link element not found");
  }
};

window.logoutAdmin = function() {
  localStorage.removeItem("adminLoggedIn");
  updateAdminLink();
};

function getRandomQuoteIndexes(count = 3) {
  const indexes = Array.from({ length: 6 }, (_, i) => i + 1);
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes.slice(0, count);
}

function renderBibleQuotes(lang) {
  const quoteCards = document.querySelectorAll('.quote-card');
  const selectedIndexes = getRandomQuoteIndexes(quoteCards.length);
  quoteCards.forEach((card, idx) => {
    const quoteIndex = selectedIndexes[idx];
    const quoteText = translations[lang][`quote${quoteIndex}`] || '';
    const quoteRef = translations[lang][`quote${quoteIndex}Ref`] || '';
    const quoteParagraph = card.querySelector('p');
    const quoteSpan = card.querySelector('span');
    if (quoteParagraph) {
      quoteParagraph.textContent = quoteText;
    }
    if (quoteSpan) {
      quoteSpan.textContent = quoteRef;
    }
  });
}


if (languageSelect) {
  languageSelect.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });
}

applyLanguage(currentLanguage);

// Check admin status and show admin link
updateAdminLink();

// Language button handlers
langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    applyLanguage(lang);
  });
});

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (contactForm && contactNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactNote.textContent = translations[currentLanguage].contactSent;
    contactForm.reset();
  });
}

function getForumPosts() {
  return JSON.parse(localStorage.getItem(FORUM_POSTS_KEY) || "[]");
}

function setForumPosts(posts) {
  localStorage.setItem(FORUM_POSTS_KEY, JSON.stringify(posts));
}

function renderForumPosts() {
  if (!forumList) {
    return;
  }
  const posts = getForumPosts().slice().reverse();
  if (posts.length === 0) {
    forumList.innerHTML = `<p class="forum-empty">${translations[currentLanguage].forumEmpty}</p>`;
    return;
  }
  forumList.innerHTML = posts
    .map(
      (post) => `<article class="forum-item">
      <h3>${post.topic}</h3>
      <p class="forum-meta">${translations[currentLanguage].forumBy}: ${post.author} | ${new Date(post.createdAt).toLocaleString()}</p>
      <p>${post.message}</p>
    </article>`
    )
    .join("");
}

// Make renderForumPosts globally available
window.renderForumPosts = renderForumPosts;

if (forumForm && forumNote) {
  forumForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const author = forumForm.forumAuthor.value.trim();
    const topic = forumForm.forumTopic.value.trim();
    const message = forumForm.forumMessage.value.trim();
    if (!author || !topic || !message) {
      return;
    }
    const posts = getForumPosts();
    posts.push({
      author,
      topic,
      message,
      createdAt: new Date().toISOString(),
    });
    setForumPosts(posts);
    forumNote.textContent = translations[currentLanguage].forumPosted;
    forumForm.reset();
    renderForumPosts();
  });
}

renderForumPosts();

// Check admin status and show admin link
// Check admin status and show admin link
function updateAdminLink() {
  const isAdmin = localStorage.getItem("isAdmin") === "true" || window.location.search.includes("admin=1");
  console.log("Admin status:", isAdmin); // Debug log
  const adminLink = document.getElementById("adminLink");
  if (adminLink) {
    adminLink.style.display = isAdmin ? "inline-block" : "none";
    console.log("Admin link display set to:", adminLink.style.display); // Debug log
  } else {
    console.log("Admin link element not found"); // Debug log
  }
}

updateAdminLink();

// Load admin-edited data from localStorage
function loadAdminData() {
  // Load about section data
  const savedAbout = JSON.parse(localStorage.getItem("adminAbout") || "{}");
  if (savedAbout.desc) {
    const descElement = document.querySelector('[data-i18n="aboutDesc"]');
    if (descElement) descElement.textContent = savedAbout.desc;
  }
  if (savedAbout.history) {
    const historyElement = document.querySelector('[data-i18n="aboutHistoryText"]');
    if (historyElement) historyElement.textContent = savedAbout.history;
  }
  if (savedAbout.mission) {
    const missionElement = document.querySelector('[data-i18n="aboutMissionText"]');
    if (missionElement) missionElement.textContent = savedAbout.mission;
  }

  // Load contacts data
  const savedContacts = JSON.parse(localStorage.getItem("adminContacts") || "{}");
  if (savedContacts.address) {
    const addressElement = document.querySelector('[data-i18n="contactAddress"]');
    if (addressElement) addressElement.textContent = savedContacts.address;
  }
  if (savedContacts.email) {
    const emailElement = document.querySelector('[data-i18n="contactEmail"]');
    if (emailElement) emailElement.textContent = savedContacts.email;
  }
  if (savedContacts.phone) {
    const phoneElement = document.querySelector('[data-i18n="contactPhone"]');
    if (phoneElement) phoneElement.textContent = savedContacts.phone;
  }
  if (savedContacts.pastor) {
    const pastorElement = document.querySelector('[data-i18n="contactPastor"]');
    if (pastorElement) pastorElement.textContent = savedContacts.pastor;
  }
}

loadAdminData();

// Check admin status and show admin link
updateAdminLink();

// Custom Cursor
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

