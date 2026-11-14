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

  // Audio configuration
  ambientMusicTitle: "Cozy Lo-Fi Birthday Chime",
  
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
    }
  ],

  // Main Vintage Parchment Letter for Coco
  parchmentLetter: {
    recipient: "Dearest Coco,",
    paragraphs: [
      "From the very first day I gave you that nickname, it stopped being just a word and quietly became my favorite name to say. There is an unspoken warmth in the way you carry yourself—a blend of genuine softness, effortless beauty, and that brilliant, infectious spark that turns even the heaviest days into something gentle.",
      "Thank you for being my safe harbor in this loud world. Thank you for never asking me to filter my thoughts, for laughing at my worst jokes, and for understanding the things I never quite know how to put into words. Having you as my best friend is the greatest gift I never knew I was allowed to have.",
      "And let's be completely honest for a second, Coco... you are way too stunning, way too intelligent, and dangerously charming to just be a best friend. If having an unfair amount of grace and charm was a crime, you would be serving consecutive life sentences without parole, sweetheart. But I'm selfish—I'm just deeply grateful that your universe collided with mine.",
      "Today is your birthday, but I'm the one celebrating, because the world is infinitely better with you in it. I promise to always celebrate your victories, protect your peace, hype you up before you conquer the world, and remind you of how extraordinary you are whenever you forget.",
      "Happy birthday, my sweet Coco. You have my whole heart, always."
    ],
    signoff: "Forever your biggest fan, confidant & partner in chaos,",
    sender: "With all my love ❤️"
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
  }
};
