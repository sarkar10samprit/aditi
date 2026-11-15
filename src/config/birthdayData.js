/**
 * Birthday Website Configuration & Content
 * Nickname: Coco
 */

const base = import.meta.env.BASE_URL;

export const birthdayData = {
  // Bestie details
  bestieName: "Coco",
  nickname: "Coco ✨",
  birthdayDate: "Happy Birthday!",
  ageMilestone: "Leveling Up Today, Coco ✨",

  // Hero subtitle & teaser
  heroGreeting: "To my dearest Coco, the girl who makes the entire universe brighter...",
  heroSubtext: "A curated digital sanctuary built just for you, because an ordinary birthday card could never match your magic.",

  // Scrapbook / Cheat Letter / Gift Items emerging from the 3D Gift Box
  giftBoxItems: [
    {
      id: 1,
      title: "Secret Cheat Note #01",
      note: "Top Secret: You are officially my favorite human to bother 24/7.",
      src: "", // Drop your PNG in public/gifts/ (e.g. "/gifts/item1.png")
      rotation: "-4deg",
      washi: "rgba(232, 114, 155, 0.6)"
    },
    {
      id: 2,
      title: "Scrapbook Memory",
      note: "Evidence of our unhinged chaos and laughing till our ribs ached.",
      src: "",
      rotation: "3deg",
      washi: "rgba(252, 211, 77, 0.6)"
    },
    {
      id: 3,
      title: "Cheat Note #02",
      note: "Warning: Looking this gorgeous on a regular Tuesday is technically illegal.",
      src: "",
      rotation: "-2.5deg",
      washi: "rgba(239, 164, 190, 0.6)"
    },
    {
      id: 4,
      title: "Sweet Token",
      note: "Redeemable for infinite iced coffees and midnight rants with zero judgment.",
      src: "",
      rotation: "4.5deg",
      washi: "rgba(254, 243, 199, 0.6)"
    }
  ],

  // Wish jar destination email
  recipientEmail: "sarkarsamprit08@gmail.com",

  // Ambient Music Playlist (Plays "Her" first, then "This Love", continuously looping 1 -> 2 -> 1 -> 2)
  playlist: [
    {
      id: 1,
      title: "Her",
      artist: "JVKE",
      src: `${base}birthday_song.mp3`
    },
    {
      id: 2,
      title: "This Love",
      artist: "Elliot James Reay",
      src: `${base}this_love.mp3`
    }
  ],

  // Secret Meme Music Playlist for Passcode 654 (Plays "Bado Badi" on loop)
  memePlaylist: [
    {
      id: 'meme-bado-badi',
      title: "Bado Badi",
      artist: "Chahat Fateh Ali Khan",
      src: `${base}bado_badi.mp3`
    }
  ],

  // Photo Gallery (Curated memories of Coco)
  photos: [
    {
      id: 1,
      title: "A little sunshine",
      caption: "No matter how chaotic my head gets, one text from you and my whole day feels lighter. You really have that effect on me.",
      src: `${base}photos/photo1.jpg`,
      date: "Archive #01",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 2,
      title: "Main character energy",
      caption: "You don't even have to try—you just walk into a room and effortlessly steal all the attention. Honestly, I'm guilty of staring too.",
      src: `${base}photos/photo2.jpg`,
      date: "Archive #02",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 3,
      title: "The Cute one",
      caption: "You have this ridiculously soft, sweet side that makes me want to protect your peace and make sure nobody ever dims that smile.",
      src: `${base}photos/photo3.jpg`,
      date: "Archive #03",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 4,
      title: "Too cute to handle",
      caption: "It should honestly be illegal for you to look this gorgeous and still be this silly with me. How do you pull both off?",
      src: `${base}photos/photo4.jpg`,
      date: "Archive #04",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 5,
      title: "The Hottest one 🌚",
      caption: "I won't say too much, but you definitely know what you're doing here. Consider my jaw permanently on the floor.",
      src: `${base}photos/photo5.jpg`,
      date: "Archive #05",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 6,
      title: "This one also cute",
      caption: "Every time you smile like this, I secretly feel so lucky that I get to be the person who gets to hear your unfiltered laugh.",
      src: `${base}photos/photo6.jpg`,
      date: "Archive #06",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 7,
      title: "Flower Girl",
      caption: "You bring so much gentle warmth into my life. I hope you always know how deeply cherished and special you are to me.",
      src: `${base}photos/photo7.jpg`,
      date: "Archive #07",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 8,
      title: "Certified Drama Queen.",
      caption: "You can be totally chaotic and dramatic, but I wouldn't trade your tantrums or your late-night talks for anyone else in the world.",
      src: `${base}photos/photo8.jpg`,
      date: "Archive #08",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 9,
      title: "The Pink Princess.",
      caption: "My absolute favorite girl celebrating another year of being unforgettable. Happy Birthday, Coco—you truly have my whole heart.",
      src: `${base}photos/photo9.jpg`,
      date: "Archive #09",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 10,
      title: "Falling for you all over again",
      caption: "Look at that smile, the glasses, that little tilt of your head... honestly, how was I ever supposed to stand a chance? Every time I look at this picture, my heart quietly falls for you all over again.",
      src: `${base}photos/photo10.jpg`,
      date: "Archive #10",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 11,
      title: "Outshining the city lights",
      caption: "Under an entire canopy of glowing fairy lights, you were still the brightest thing on the street. Pure grace, effortless elegance, and completely unforgettable.",
      src: `${base}photos/photo11.jpg`,
      date: "Archive #11",
      rotation: "0deg",
      objectPosition: "center center"
    },
    {
      id: 12,
      title: "My Lotus Blossom 🪷",
      caption: "Holding a pink lotus and looking so peaceful, like the whole chaotic world went quiet just for you. You really are the gentlest, most beautiful soul.",
      src: `${base}photos/photo12.jpg`,
      date: "Archive #12",
      rotation: "0deg",
      objectPosition: "center center"
    }
  ],

  // Main Vintage Parchment Letter for Coco (2 Balanced, Completely Filled Pages)
  parchmentLetter: {
    recipient: "Dearest Coco, ❤️",
    pages: [
      {
        pageNumber: 1,
        paragraphs: [
          "From the very first day I gave you that nickname, it stopped being just a word and quietly became my favorite name to say.",
          "You know, I don't think you realize how effortlessly you make someone's day better just by being yourself. There's something about your smile, your little attitude, your random silliness, and the way you turn the most ordinary conversations into something worth remembering. You're honestly a whole package, Coco. A little sunshine, a little chaos, a little drama (okay, maybe a LOT of drama 😭), and a heart that deserves all the happiness in the world.",
          "I'm genuinely grateful to have you in my life. Thank you for listening to my nonsense, tolerating my questionable jokes, putting up with my random moods, and making even the most boring days feel a little less boring. I hope you know you never have to pretend to be someone else around me. I'll still be right here, cheering for you.",
          "And can we talk about how unfairly blessed you are? Pretty face, beautiful heart, smart brain, a little bit Gandu-ness 😅, and that ridiculously charming personality? Seriously, Coco, leave some good qualities for the rest of humanity. 😭 At this point, I'm convinced you were created with a little extra attention to detail. Don't let all this praise get to your head, though. You're still very much annoying, and I reserve the right to remind you of that whenever necessary. 😂"
        ]
      },
      {
        pageNumber: 2,
        paragraphs: [
          "I know we still have so many little moments waiting for us. More laughs, more silly conversations, more random adventures, and hopefully that long-overdue first hug someday. Until then, here's a little reminder that distance doesn't make you any less important to me. 🫂",
          "On your birthday, I wish you all the happiness you can possibly hold. I hope you get countless reasons to smile, people who love you as genuinely as you deserve, dreams that come true, and beautiful little surprises when you least expect them. And whenever life gets difficult, I hope you never forget how strong, capable, and special you are.",
          "Please keep being your wonderfully ridiculous self. Never dim that beautiful spark, never settle for less than you deserve, and never forget that there's someone out here who is ridiculously proud of you and will probably annoy you with birthday wishes even after your birthday is over. ❤️",
          "Happy Birthday, Coco! 🎂💗",
          "Thank you for being you, for being my bestie, and for making this little corner of my world so much brighter.",
          "Now go enjoy your special day, birthday girl. You've officially earned the right to be extra spoiled today. Not that you weren't already extra. 😭😂"
        ],
        signoff: "With lots of love, endless appreciation, and a lifetime supply of friendly teasing,",
        sender: "Your biggest cheerleader, favourite nuisance & partner in chaos. ❤️"
      }
    ],
    paragraphs: [
      "From the very first day I gave you that nickname, it stopped being just a word and quietly became my favorite name to say.",
      "You know, I don't think you realize how effortlessly you make someone's day better just by being yourself. There's something about your smile, your little attitude, your random silliness, and the way you turn the most ordinary conversations into something worth remembering. You're honestly a whole package, Coco. A little sunshine, a little chaos, a little drama (okay, maybe a LOT of drama 😭), and a heart that deserves all the happiness in the world.",
      "I'm genuinely grateful to have you in my life. Thank you for listening to my nonsense, tolerating my questionable jokes, putting up with my random moods, and making even the most boring days feel a little less boring. I hope you know you never have to pretend to be someone else around me. I'll still be right here, cheering for you.",
      "And can we talk about how unfairly blessed you are? Pretty face, beautiful heart, smart brain, a little bit Gandu-ness 😅, and that ridiculously charming personality? Seriously, Coco, leave some good qualities for the rest of humanity. 😭 At this point, I'm convinced you were created with a little extra attention to detail. Don't let all this praise get to your head, though. You're still very much annoying, and I reserve the right to remind you of that whenever necessary. 😂",
      "I know we still have so many little moments waiting for us. More laughs, more silly conversations, more random adventures, and hopefully that long-overdue first hug someday. Until then, here's a little reminder that distance doesn't make you any less important to me. 🫂",
      "On your birthday, I wish you all the happiness you can possibly hold. I hope you get countless reasons to smile, people who love you as genuinely as you deserve, dreams that come true, and beautiful little surprises when you least expect them. And whenever life gets difficult, I hope you never forget how strong, capable, and special you are.",
      "Please keep being your wonderfully ridiculous self. Never dim that beautiful spark, never settle for less than you deserve, and never forget that there's someone out here who is ridiculously proud of you and will probably annoy you with birthday wishes even after your birthday is over. ❤️",
      "Happy Birthday, Coco! 🎂💗",
      "Thank you for being you, for being my bestie, and for making this little corner of my world so much brighter.",
      "Now go enjoy your special day, birthday girl. You've officially earned the right to be extra spoiled today. Not that you weren't already extra. 😭😂"
    ],
    signoff: "With lots of love, endless appreciation, and a lifetime supply of friendly teasing,",
    sender: "Your biggest cheerleader, favourite nuisance & partner in chaos. ❤️"
  },

  // Supporting Letters
  loveLetters: [
    {
      id: "letter-1",
      tag: "Pure Heart",
      title: "To my favorite safe place in this noisy world...",
      preview: "I don't know what I did in a past life to deserve you, but I'm never letting you go, Coco.",
      content: `I don't know what good deeds I did in a past life to deserve a soul as warm, real, and radiant as you in this one, Coco, but I thank the universe every day for it.

Thank you for being my safe space when the world gets too loud. Thank you for never judging my messy thoughts, for laughing at my terrible jokes, and for knowing exactly what I'm feeling before I even say a single word. Having you in my life makes everything feel lighter, softer, and so much more hopeful. You are truly rare, and today is all about celebrating you.`
    },
    {
      id: "letter-2",
      tag: "Warning: A Little Flirty",
      title: "Is it even legal to look this gorgeous, Coco?",
      preview: "If being effortlessly cute was a crime, you'd be serving life without parole, sweetheart.",
      content: `Okay, let's be totally real for a second, Coco: who gave you permission to be this pretty, this smart, and this insanely funny all at once? It honestly feels unfair to everyone else.

I'm not saying I'm completely obsessed with you, but if you went missing, my search party would have custom embroidered merchandise and billboards within two hours. You have this magnetic glow that lights up every single room you walk into, and you make my heart do little backflips without even trying. Never change that irresistible charm.`
    },
    {
      id: "letter-3",
      tag: "Partners in Crime",
      title: "The unbreakable bond we built",
      preview: "Distance, time, bad days, good days—no matter what changes, you and I are permanent.",
      content: `No matter how crazy life gets, or how far apart our schedules drift, Coco, you will always be the first person I want to text when something good happens, and the only person I want to call when things fall apart.

We have survived breakdowns, hilarious mistakes, and endless midnight rants. You are more than a best friend—you are family, my chosen person, and my permanent partner in chaos. As long as I'm around, you will never have to face a single hard day alone.`
    },
    {
      id: "letter-4",
      tag: "Birthday Vow",
      title: "A promise for your brand new year",
      preview: "May your upcoming year be as extraordinary, sweet, and breathtaking as you are, Coco.",
      content: `On this birthday, Coco, I wish you endless adventures, iced coffees that hit just right, peaceful mornings, big wins, and people who treat you with the deep adoration and respect you deserve.

I promise to always celebrate your victories like they are my own, to always hype you up before you walk into any room, to always keep your deepest secrets safe, and to remind you of how truly extraordinary you are whenever you forget. Happy birthday, sunshine!`
    }
  ],

  // 10 Reasons Why Coco is Loved
  reasonsWhy: [
    {
      number: "01",
      title: "Your Beautiful Laugh",
      text: "Your laugh is honestly my favourite sound ever. It's the kind of happiness that's impossible not to catch, and I hope you never stop laughing like that."
    },
    {
      number: "02",
      title: "Your Golden Heart",
      text: "You have the softest heart. You make people feel heard, understood, and appreciated in ways you probably don't even realize. The world needs more hearts like yours."
    },
    {
      number: "03",
      title: "Every Little Adventure",
      text: "Somehow, you can turn the most ordinary moments into the most unforgettable memories. Even doing absolutely nothing becomes something special when it's with you."
    },
    {
      number: "04",
      title: "Your Little Attitude",
      text: "That adorable head tilt, your playful sass, and the way you act all innocent afterwards. Seriously, how can someone be this ridiculously cute? 😭"
    },
    {
      number: "05",
      title: "Your Loyalty",
      text: "You don't give up on the people you love. You show up, you care, and you stay even when things aren't easy. That's something truly beautiful about you."
    },
    {
      number: "06",
      title: "That Magical Smile",
      text: "I swear, your smile deserves its own award. It can turn a terrible day into a beautiful one, and I hope life always gives you a million reasons to wear it."
    },
    {
      number: "07",
      title: "The Way You Listen",
      text: "You don't just hear people; you genuinely try to understand them. You make others feel like their words matter, and that's a rare kind of magic."
    },
    {
      number: "08",
      title: "A Hug We Still Owe Each Other",
      text: "We haven't shared that first hug yet, but I already know it'll be one of those moments worth waiting for. Until then, consider this a virtual hug with a little promise attached: one day, no screens, no distance, just a real hug. 🫂💗"
    },
    {
      number: "09",
      title: "Your Unintentional Iconic Energy",
      text: "You don't even have to try to be amazing. You're effortlessly funny, charming, and wonderfully you. I hope you see yourself through the eyes of the people who adore you."
    },
    {
      number: "10",
      title: "Simply Because You're You",
      text: "And honestly, I could write a thousand more reasons, but none would be enough. There's only one you, and no matter how many people exist in this universe or any other, nobody could ever take your place."
    }
  ],
  reasonsClosing: {
    title: "Happy Birthday, Coco! ❤️",
    subtext: "Never forget that you are someone's favourite person, someone's reason to smile, and a once-in-a-lifetime kind of human."
  },

  // Interactive Wish Jar
  initialWishes: [
    { id: 1, text: "Endless happiness & peace of mind for our Coco", author: "With all my love ❤️" },
    { id: 2, text: "All your wildest dreams coming true this year ✨", author: "Your biggest fan" },
    { id: 3, text: "More spontaneous trips and ice cream dates 🍦", author: "Your partner in crime" },
    { id: 4, text: "Unlimited good hair days and outfit compliments 💅", author: "Truth teller" }
  ],

  // Virtual Cake messages
  cakeSection: {
    title: "Make a Birthday Wish, Coco ✨",
    instructions: "Close your eyes, think of the one dream your heart desires most this year, and blow out the candles! 🎂",
    blownSuccessMessage: "Your wish has been dispatched to the stars, Coco! May every single one of your dreams come true! 🎉💖"
  },

  // The Meme Vault & Chaos Corner (10 Unhinged Moments)
  funnyMemes: [
    {
      id: 1,
      title: "I showed u my nose answer me 👁️👃👁️",
      caption: "The literal definition of accidental front-camera terror. The FBI agent watching your phone was probably crying laughing.",
      badge: "💀 0.5X INCIDENT",
      reaction: "😭",
      src: `${base}memes/meme1.jpg`,
      webp: `${base}memes/meme1.webp`,
      rotation: "-2deg"
    },
    {
      id: 2,
      title: "The CEO of High Volume Hair 💇‍♀️",
      caption: "Testing out a new 10-foot tall hairstyle on video call with the most deadpan, serious stare known to humanity.",
      badge: "💈 80s ROCKSTAR",
      reaction: "😂",
      src: `${base}memes/meme2.jpg`,
      webp: `${base}memes/meme2.webp`,
      rotation: "2.5deg"
    },
    {
      id: 3,
      title: "Caught in 144p HD 📱",
      caption: "Recorded on a microwave from 2004. You were definitely in the middle of a 5-alarm theatrical crisis over nothing.",
      badge: "🎭 MAXIMUM DRAMA",
      reaction: "💀",
      src: `${base}memes/meme3.jpg`,
      webp: `${base}memes/meme3.webp`,
      rotation: "-1.5deg"
    },
    {
      id: 4,
      title: "Snack Devourer Mode 🍪",
      caption: "No thoughts, head completely empty, just pure unadulterated joy eating snacks at 2 AM with that goofy smile.",
      badge: "😋 ZERO SHAME",
      reaction: "✨",
      src: `${base}memes/meme4.jpg`,
      webp: `${base}memes/meme4.webp`,
      rotation: "2deg"
    },
    {
      id: 5,
      title: "Daily Existential Panic 🤯",
      caption: "When you realize your actions have consequences, or when the waiter asks what you want and your brain reboots.",
      badge: "🚨 SYSTEM ERROR",
      reaction: "🤡",
      src: `${base}memes/meme5.jpg`,
      webp: `${base}memes/meme5.webp`,
      rotation: "-3deg"
    },
    {
      id: 6,
      title: "Golgappa One-Bite Champion 🥟",
      caption: "Nobody will ever love you as deeply as you love stuffing giant whole street-food pieces into your mouth.",
      badge: "🏆 FOOD VANDAL",
      reaction: "🔥",
      src: `${base}memes/meme6.jpg`,
      webp: `${base}memes/meme6.webp`,
      rotation: "1.8deg"
    },
    {
      id: 7,
      title: "Stealth Mango Heist 🥭",
      caption: "Sitting at the feast looking around like you're committing an international jewel robbery with that mango slice.",
      badge: "🦝 SUSPICIOUS RACCOON",
      reaction: "👀",
      src: `${base}memes/meme7.jpg`,
      webp: `${base}memes/meme7.webp`,
      rotation: "-2.2deg"
    },
    {
      id: 8,
      title: "Pufferfish Defense Mechanism 🐡",
      caption: "Puffing your cheeks like you're preparing to blow up a small kingdom just because you had to tie your hair.",
      badge: "🐡 100% PUFFER",
      reaction: "😂",
      src: `${base}memes/meme8.jpg`,
      webp: `${base}memes/meme8.webp`,
      rotation: "2.8deg"
    },
    {
      id: 9,
      title: "Planning My Demise 🌚",
      caption: "That terrifying, iconic smirk right before you say something completely unhinged or roast me into another dimension.",
      badge: "😈 CRIMINAL MASTERMIND",
      reaction: "💅",
      src: `${base}memes/meme9.jpg`,
      webp: `${base}memes/meme9.webp`,
      rotation: "-1.8deg"
    },
    {
      id: 10,
      title: "Unfiltered Goblin Mode 🤪",
      caption: "My favorite kind of Coco—completely ridiculous, loud, zero filter, and laughing until your ribs hurt.",
      badge: "👑 CERTIFIED GREMLIN",
      reaction: "💖",
      src: `${base}memes/meme10.jpg`,
      webp: `${base}memes/meme10.webp`,
      rotation: "2.2deg"
    }
  ]
};
