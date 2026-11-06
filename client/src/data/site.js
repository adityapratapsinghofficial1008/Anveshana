export const SITE = {
  name: 'Anveshana',
  tagline: 'Ask. Share. Build. Together.',
  email: 'theheroadityasingh498@gmail.com',
  mailto: 'mailto:theheroadityasingh498@gmail.com?subject=Joining%20Anveshana',
  memberCount: 40,
}

export const TAGLINE = ['Ask.', 'Share.', 'Build.', 'Together.']

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'what-we-do', label: 'What we do' },
  { id: 'topics', label: 'Topics' },
  { id: 'who', label: "Who it's for" },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'faq', label: 'FAQ' },
]

export const SECTION_IDS = NAV_LINKS.map((link) => link.id)

export const HERO = {
  eyebrow: 'A community for the curious',
  lede: 'Anveshana is a serious tech community for people curious about technology, innovation, entrepreneurship, life and philosophy. Bring your questions, your half-formed ideas, your hardest problems — and find the people who want to solve them with you.',
}

export const ABOUT = {
  eyebrow: 'About us',
  title: 'A room for people who think out loud.',
  paragraphs: [
    'The most interesting problems rarely fit inside one discipline. A system needs an engineer, an idea needs a reason to exist, and a life spent building needs a philosophy to keep it honest. Anveshana is where those threads meet.',
    'We are a small community that would rather think carefully than post quickly. Some of us write code. Some of us are starting something. All of us are curious about how things work, and what they are for.',
    'Serious does not mean solemn. It means we take the question seriously: we read before we reply, we say when we do not know, and we stay with a problem longer than a comment thread usually allows.',
  ],
  quote: 'Curiosity is the only entry requirement.',
  statNote: 'A small room by design. Depth over volume.',
}

export const WHAT_WE_DO = {
  eyebrow: 'What we do',
  title: 'Three things, done properly.',
  lede: 'Every part of Anveshana comes back to one of these. No feeds to scroll, no noise to manage.',
  items: [
    {
      index: '01',
      title: 'Ask',
      body: 'Stuck on a bug, a design decision, a paper, a career move? Ask. Someone here has probably been there, and the ones who have not are usually willing to think it through with you.',
      footer: 'No question goes unanswered',
    },
    {
      index: '02',
      title: 'Share',
      body: 'Put a half-formed idea in front of curious minds and see how far it can go. The feedback is honest, specific, and aimed at making the idea better.',
      footer: 'Feedback before the internet',
    },
    {
      index: '03',
      title: 'Build',
      body: 'When an idea survives the conversation, find the people who want to build it with you. Different skills, one problem, shared momentum.',
      footer: 'Find your team',
    },
  ],
}

export const TOPICS = {
  eyebrow: 'Topics we explore',
  title: 'Five threads, one conversation.',
  lede: 'We do not separate the technical from the human. Most real problems need both.',
  items: [
    {
      number: '01',
      title: 'Technology',
      description: 'How we build with code, systems and AI — the craft, the tradeoffs, and the parts that only make sense once you have shipped something.',
      keywords: ['Code', 'Systems', 'AI', 'Tools'],
    },
    {
      number: '02',
      title: 'Innovation',
      description: 'New ways of thinking, making, and breaking what has always been done.',
      keywords: ['Ideas', 'Experiment', 'Change'],
    },
    {
      number: '03',
      title: 'Entrepreneurship',
      description: 'From first ideas to first users — the messy, human side of building something that did not exist before.',
      keywords: ['Founding', 'Users', 'Growth'],
    },
    {
      number: '04',
      title: 'Life',
      description: 'Work, balance, growth, and figuring out how to live well while we build.',
      keywords: ['Balance', 'Growth', 'Habits'],
    },
    {
      number: '05',
      title: 'Philosophy',
      description: 'Big questions about how we think, live and build — and what we owe each other along the way.',
      keywords: ['Thinking', 'Ethics', 'Meaning'],
    },
  ],
}

export const WHO = {
  eyebrow: "Who it's for",
  title: 'Different disciplines. The same appetite.',
  lede: 'Anveshana is not built around a job title. It is built around the kind of question you cannot leave alone.',
  items: [
    {
      index: '01',
      title: 'Builders',
      body: 'Engineers, designers and makers who care how a thing is made, not only that it ships.',
      tags: ['Engineering', 'Design', 'Craft'],
    },
    {
      index: '02',
      title: 'Founders',
      body: 'People turning an idea into something real, and looking for honest thinking before the next step.',
      tags: ['Startups', 'Product', 'Strategy'],
    },
    {
      index: '03',
      title: 'Researchers & students',
      body: 'Anyone chasing a question through papers, experiments or a degree, and wanting company along the way.',
      tags: ['Research', 'Science', 'Learning'],
    },
    {
      index: '04',
      title: 'Writers & thinkers',
      body: 'People who untangle ideas for a living and treat clarity as a form of building.',
      tags: ['Writing', 'Philosophy', 'Critique'],
    },
  ],
}

export const HOW_IT_WORKS = {
  eyebrow: 'How it works',
  title: 'Four steps, then the real work.',
  lede: 'There is no application gauntlet. Tell us what you are curious about, and start talking.',
  steps: [
    {
      number: '1',
      title: 'Join the community',
      body: 'Send the form with your details and one honest question or interest. We read every response.',
    },
    {
      number: '2',
      title: 'Introduce yourself and your curiosity',
      body: 'Say hello, share what you are working on or wondering about, and meet the room.',
    },
    {
      number: '3',
      title: 'Ask, share, discuss',
      body: 'Post the question you have been stuck on. Offer feedback on an idea. Disagree well.',
    },
    {
      number: '4',
      title: 'Find your people and build',
      body: 'Team up around a problem worth solving, and keep the conversation going while you build.',
    },
  ],
}

export const MANIFESTO = {
  eyebrow: 'What we hold ourselves to',
  lines: [
    { text: 'No question should go ', emphasis: 'unanswered' },
    { text: 'No good idea should go ', emphasis: 'unexplored' },
    { text: 'No one should have to figure everything out ', emphasis: 'alone' },
  ],
}

export const JOIN = {
  eyebrow: 'Join the community',
  title: 'Bring your curiosity. We will bring the room.',
  lede: 'Tell us a little about yourself. A person reads every request, and we reply by email.',
  points: [
    'We read your note — a person, not a filter.',
    'You get a welcome email with the next step.',
    'You introduce yourself, and the conversation starts.',
  ],
  consent:
    'I agree to be contacted by Anveshana about the community, and I understand my details stay inside it.',
}

export const FAQS = {
  eyebrow: 'Questions, answered',
  title: 'Before you ask to join.',
  items: [
    {
      question: 'Is Anveshana free to join?',
      answer:
        'Yes. Joining costs nothing. We ask for a little honesty and a genuine question, not a subscription.',
    },
    {
      question: 'Do I need to be an engineer?',
      answer:
        'No. We care about how you think, not what you studied. Writers, designers, founders, students and people still deciding are all welcome.',
    },
    {
      question: 'What happens after I submit the form?',
      answer:
        'We read every request and reach out by email. If it takes a few days, that is a person on the other side, not a queue.',
    },
    {
      question: 'How much time does it take?',
      answer:
        'As much or as little as you have. Some members drop in with one question a month; others are here daily. Both are fine.',
    },
    {
      question: 'What kind of questions are welcome?',
      answer:
        'Technical, strategic, philosophical, personal — as long as they are asked in good faith and you are willing to engage with the answer.',
    },
  ],
}

/**
 * Add your links here. An empty href renders the icon as a muted placeholder,
 * so the footer never ships with dead links.
 */
export const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/anveshana-global/', icon: 'linkedin' },
]
