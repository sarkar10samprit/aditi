/**
 * Birthday Website Configuration & Content
 * 
 * You can easily customize names, dates, photos, and messages here!
 * To add real photos later, simply place your image files in the `public/photos/` folder
 * and update the `src` property below (e.g., "/photos/pic1.jpg").
 */

export const birthdayData = {
  // Bestie details
  bestieName: "Bestie",
  nickname: "My Favorite Human",
  birthdayDate: "Happy Birthday!",
  ageMilestone: "Leveling Up Today ✨",
  
  // Hero subtitle & teaser
  heroGreeting: "To the girl who makes the world infinitely brighter...",
  heroSubtext: "A special digital playground built just for you, because an ordinary birthday card could never match your energy.",
  
  // Audio configuration
  ambientMusicTitle: "Cozy Birthday Lo-Fi Tune",
  
  // Photo Polaroids (Blank placeholders with cute SVG / frame styling ready for real images)
  photos: [
    {
      id: 1,
      title: "The Chaos Duo",
      caption: "Proof that two chaotic souls make one unstoppable team. Never stop being unhinged with me.",
      src: "", // Leave blank for placeholder frame or add "/photos/photo1.jpg"
      date: "Core Memory #01",
      rotation: "-3deg",
      tapeColor: "rgba(255, 182, 193, 0.7)"
    },
    {
      id: 2,
      title: "Dangerously Cute",
      caption: "Still wondering how you manage to look this stunning while also being the biggest goofball on earth.",
      src: "",
      date: "Core Memory #02",
      rotation: "2.5deg",
      tapeColor: "rgba(232, 213, 255, 0.7)"
    },
    {
      id: 3,
      title: "Late Night Talks",
      caption: "From 2 AM existential crises to laughing until our stomachs hurt over literally nothing.",
      src: "",
      date: "Core Memory #03",
      rotation: "-2deg",
      tapeColor: "rgba(255, 209, 220, 0.7)"
    },
    {
      id: 4,
      title: "Golden Hour Glow",
      caption: "You don't need golden hour lighting when you naturally shine this bright every single day.",
      src: "",
      date: "Core Memory #04",
      rotation: "3deg",
      tapeColor: "rgba(255, 230, 180, 0.7)"
    },
    {
      id: 5,
      title: "Our Signature Stare",
      caption: "That exact unspoken look across the room when we both know someone just did something ridiculous.",
      src: "",
      date: "Core Memory #05",
      rotation: "-1.5deg",
      tapeColor: "rgba(255, 182, 193, 0.7)"
    },
    {
      id: 6,
      title: "Forever & Ever",
      caption: "Growing older, but solemnly promising to never grow up without each other by our side.",
      src: "",
      date: "Core Memory #06",
      rotation: "2deg",
      tapeColor: "rgba(200, 230, 255, 0.7)"
    }
  ],

  // Deep, loving, caring, and flirty notes
  loveLetters: [
    {
      id: "letter-1",
      tag: "Pure Heart",
      title: "To my favorite safe place in this noisy world...",
      preview: "I don't know what I did in a past life to deserve you, but I'm never letting you go.",
      content: `I don't know what good deeds I did in a past life to deserve a soul as warm, real, and radiant as you in this one, but I thank the universe every day for it.

Thank you for being my safe space when the world gets too loud. Thank you for never judging my messy thoughts, for laughing at my terrible jokes, and for knowing exactly what I'm feeling before I even say a single word. Having you in my life makes everything feel lighter, softer, and so much more hopeful. You are truly rare, and today is all about celebrating you.`
    },
    {
      id: "letter-2",
      tag: "Warning: A Little Flirty",
      title: "Is it even legal to look this gorgeous?",
      preview: "If being effortlessly cute was a crime, you'd be serving life without parole, sweetheart.",
      content: `Okay, let's be totally real for a second: who gave you permission to be this pretty, this smart, and this insanely funny all at once? It honestly feels unfair to everyone else.

I'm not saying I'm completely obsessed with you, but if you went missing, my search party would have custom embroidered merchandise and billboards within two hours. You have this magnetic glow that lights up every single room you walk into, and you make my heart do little backflips without even trying. Never change that irresistible charm.`
    },
    {
      id: "letter-3",
      tag: "Partners in Crime",
      title: "The unbreakable bond we built",
      preview: "Distance, time, bad days, good days—no matter what changes, you and I are permanent.",
      content: `No matter how crazy life gets, or how far apart our schedules drift, you will always be the first person I want to text when something good happens, and the only person I want to call when things fall apart.

We have survived breakdowns, questionable haircut phases, hilarious mistakes, and endless midnight rants. You are more than a best friend—you are family, my chosen person, and my permanent partner in chaos. As long as I'm around, you will never have to face a single hard day alone.`
    },
    {
      id: "letter-4",
      tag: "Birthday Vow",
      title: "A promise for your brand new year",
      preview: "May your upcoming year be as extraordinary, sweet, and breathtaking as you are.",
      content: `On this birthday, I wish you endless adventures, iced coffees that hit just right, peaceful mornings, big wins, and people who treat you with the deep adoration and respect you deserve.

I promise to always celebrate your victories like they are my own, to always hype you up before you walk into any room, to always keep your deepest secrets safe, and to remind you of how truly extraordinary you are whenever you forget. Happy birthday, sunshine!`
    }
  ],

  // 10 Reasons Why You're Irresistible & Loved
  reasonsWhy: [
    { number: "01", text: "Your laugh is genuinely the most contagious, serotonin-boosting sound in the universe." },
    { number: "02", text: "You have a heart so gentle it makes everyone around you feel valued and safe." },
    { number: "03", text: "You can turn an ordinary grocery run or car ride into an unforgettable adventure." },
    { number: "04", text: "The way you tilt your head when you're playfully sassy is ridiculously cute." },
    { number: "05", text: "You never give up on the people you care about, even when things get tough." },
    { number: "06", text: "Your smile could literally resolve diplomatic conflicts and melt glaciers." },
    { number: "07", text: "You listen to understand, not just to reply—a quality so rare nowadays." },
    { number: "08", text: "You give the absolute warmest, most therapeutic hugs in existence." },
    { number: "09", text: "You're effortlessly cool without even realizing how iconic you actually are." },
    { number: "10", text: "Because you are you, and no one in the multiverse could ever take your place." }
  ],

  // Interactive Wish Jar Default Wishes
  initialWishes: [
    { id: 1, text: "Endless happiness & peace of mind", author: "With all my love ❤️" },
    { id: 2, text: "All your wildest dreams coming true this year ✨", author: "Your biggest fan" },
    { id: 3, text: "More spontaneous trips and ice cream dates 🍦", author: "Your partner in crime" },
    { id: 4, text: "Unlimited good hair days and outfit compliments 💅", author: "Truth teller" }
  ],

  // Virtual Cake messages
  cakeSection: {
    title: "Make a Secret Birthday Wish!",
    instructions: "Close your eyes, think of the one thing your heart desires most this year, and click the cake to blow out the candles! 🎂✨",
    blownSuccessMessage: "Your wish has been dispatched to the stars! May it all come true! 🎉💖"
  }
};
