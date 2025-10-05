import {
  CodeBracketIcon,
  PaintBrushIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export const aiToolsData = [
  {
    category: 'Coding & Development',
    icon: CodeBracketIcon,
    color: 'bg-blue-500',
    tools: [
      { name: 'GitHub Copilot', description: 'AI pair programmer', link: 'https://github.com/features/copilot', tags: ['Code Generation'] },
      { name: 'ChatGPT', description: 'Coding help and debugging', link: 'https://chat.openai.com', tags: ['Code Help'] },
      { name: 'Tabnine', description: 'AI code completion', link: 'https://www.tabnine.com', tags: ['Auto-complete'] },
      { name: 'Replit Ghostwriter', description: 'AI coding in Replit', link: 'https://replit.com/ai', tags: ['IDE'] },
      { name: 'Codeium', description: 'Free AI code completion', link: 'https://codeium.com', tags: ['Free'] },
      { name: 'Amazon CodeWhisperer', description: 'AWS AI coding companion', link: 'https://aws.amazon.com/codewhisperer', tags: ['AWS'] },
      { name: 'Cursor', description: 'AI-first code editor', link: 'https://cursor.sh', tags: ['Editor'] },
      { name: 'Sourcegraph Cody', description: 'Context-aware AI assistant', link: 'https://sourcegraph.com/cody', tags: ['Context'] },
      { name: 'Phind', description: 'AI search for developers', link: 'https://www.phind.com', tags: ['Search'] },
      { name: 'CodeGPT', description: 'VS Code AI assistant', link: 'https://codegpt.co', tags: ['VS Code'] },
      { name: 'Blackbox AI', description: 'Code search and autocomplete', link: 'https://www.blackbox.ai', tags: ['Search'] },
      { name: 'Pieces', description: 'AI code snippet manager', link: 'https://pieces.app', tags: ['Snippets'] },
      { name: 'Mintlify', description: 'AI documentation writer', link: 'https://mintlify.com', tags: ['Documentation'] },
      { name: 'Codex', description: 'OpenAI code model', link: 'https://openai.com/blog/openai-codex', tags: ['API'] },
      { name: 'Kite', description: 'AI code completions', link: 'https://www.kite.com', tags: ['Completion'] },
      { name: 'Mutable AI', description: 'AI accelerated software development', link: 'https://mutable.ai', tags: ['Development'] }
    ]
  },
  {
    category: 'Design & Creativity',
    icon: PaintBrushIcon,
    color: 'bg-pink-500',
    tools: [
      { name: 'Midjourney', description: 'AI art generation', link: 'https://www.midjourney.com', tags: ['Art'] },
      { name: 'DALL-E 3', description: 'Text to image AI', link: 'https://openai.com/dall-e-3', tags: ['Image'] },
      { name: 'Canva AI', description: 'AI design tools', link: 'https://www.canva.com/ai-image-generator/', tags: ['Design'] },
      { name: 'Figma AI', description: 'AI in Figma', link: 'https://www.figma.com', tags: ['UI/UX'] },
      { name: 'Stable Diffusion', description: 'Open source image AI', link: 'https://stability.ai', tags: ['Open Source'] },
      { name: 'Leonardo AI', description: 'Game asset generation', link: 'https://leonardo.ai', tags: ['Gaming'] },
      { name: 'Adobe Firefly', description: 'Adobe AI image generator', link: 'https://www.adobe.com/products/firefly.html', tags: ['Adobe'] },
      { name: 'Playground AI', description: 'Free AI image creator', link: 'https://playgroundai.com', tags: ['Free'] },
      { name: 'Lexica', description: 'Stable Diffusion search', link: 'https://lexica.art', tags: ['Search'] },
      { name: 'DreamStudio', description: 'Stability AI interface', link: 'https://dreamstudio.ai', tags: ['Interface'] },
      { name: 'Artbreeder', description: 'Collaborative AI art', link: 'https://www.artbreeder.com', tags: ['Collaborative'] },
      { name: 'NightCafe', description: 'AI art generator', link: 'https://nightcafe.studio', tags: ['Art'] },
      { name: 'Craiyon', description: 'Free AI image generator', link: 'https://www.craiyon.com', tags: ['Free'] },
      { name: 'Photoshop AI', description: 'AI in Photoshop', link: 'https://www.adobe.com/products/photoshop.html', tags: ['Adobe'] },
      { name: 'Remove.bg', description: 'AI background remover', link: 'https://www.remove.bg', tags: ['Background'] },
      { name: 'Looka', description: 'AI logo designer', link: 'https://looka.com', tags: ['Logo'] }
    ]
  },
  {
    category: 'Writing & Content',
    icon: DocumentTextIcon,
    color: 'bg-purple-500',
    tools: [
      { name: 'Grammarly', description: 'AI writing assistant', link: 'https://www.grammarly.com', tags: ['Grammar'] },
      { name: 'Jasper AI', description: 'AI content writer', link: 'https://www.jasper.ai', tags: ['Content'] },
      { name: 'QuillBot', description: 'Paraphrasing tool', link: 'https://quillbot.com', tags: ['Paraphrase'] },
      { name: 'Notion AI', description: 'AI in Notion', link: 'https://www.notion.so/product/ai', tags: ['Notes'] },
      { name: 'Copy.ai', description: 'AI copywriting', link: 'https://www.copy.ai', tags: ['Copywriting'] },
      { name: 'Writesonic', description: 'AI content generator', link: 'https://writesonic.com', tags: ['Content'] },
      { name: 'Rytr', description: 'AI writing assistant', link: 'https://rytr.me', tags: ['Writing'] },
      { name: 'Wordtune', description: 'AI writing companion', link: 'https://www.wordtune.com', tags: ['Rewriting'] },
      { name: 'Hemingway Editor', description: 'Writing clarity tool', link: 'https://hemingwayapp.com', tags: ['Clarity'] },
      { name: 'ProWritingAid', description: 'Grammar and style checker', link: 'https://prowritingaid.com', tags: ['Grammar'] },
      { name: 'Sudowrite', description: 'AI for creative writing', link: 'https://www.sudowrite.com', tags: ['Creative'] },
      { name: 'Frase', description: 'SEO content optimization', link: 'https://www.frase.io', tags: ['SEO'] },
      { name: 'Anyword', description: 'AI copywriting platform', link: 'https://anyword.com', tags: ['Marketing'] },
      { name: 'Simplified', description: 'All-in-one content tool', link: 'https://simplified.com', tags: ['All-in-one'] },
      { name: 'Compose AI', description: 'AI writing automation', link: 'https://www.compose.ai', tags: ['Automation'] },
      { name: 'Hyperwrite', description: 'Personal AI writing assistant', link: 'https://www.hyperwriteai.com', tags: ['Personal'] }
    ]
  },
  {
    category: 'Video & Audio',
    icon: VideoCameraIcon,
    color: 'bg-red-500',
    tools: [
      { name: 'Runway ML', description: 'AI video editing', link: 'https://runwayml.com', tags: ['Video'] },
      { name: 'Descript', description: 'Edit video by text', link: 'https://www.descript.com', tags: ['Transcription'] },
      { name: 'ElevenLabs', description: 'AI voice generation', link: 'https://elevenlabs.io', tags: ['Voice'] },
      { name: 'Synthesia', description: 'AI video with avatars', link: 'https://www.synthesia.io', tags: ['Avatars'] },
      { name: 'Pictory', description: 'Text to video AI', link: 'https://pictory.ai', tags: ['Text-to-Video'] },
      { name: 'Murf AI', description: 'AI voice generator', link: 'https://murf.ai', tags: ['Voice'] },
      { name: 'Lumen5', description: 'Video creation platform', link: 'https://lumen5.com', tags: ['Video'] },
      { name: 'Fliki', description: 'Text to video with AI voices', link: 'https://fliki.ai', tags: ['Text-to-Video'] },
      { name: 'Kapwing', description: 'AI video editing', link: 'https://www.kapwing.com', tags: ['Editing'] },
      { name: 'VEED', description: 'Online video editor with AI', link: 'https://www.veed.io', tags: ['Online'] },
      { name: 'Wondershare Filmora', description: 'AI video editing software', link: 'https://filmora.wondershare.com', tags: ['Software'] },
      { name: 'Podcastle', description: 'AI podcast creation', link: 'https://podcastle.ai', tags: ['Podcast'] },
      { name: 'Cleanvoice', description: 'AI audio editing', link: 'https://cleanvoice.ai', tags: ['Audio'] },
      { name: 'Krisp', description: 'AI noise cancellation', link: 'https://krisp.ai', tags: ['Noise Cancel'] },
      { name: 'Resemble AI', description: 'AI voice cloning', link: 'https://www.resemble.ai', tags: ['Voice Clone'] },
      { name: 'Speechify', description: 'Text to speech AI', link: 'https://speechify.com', tags: ['TTS'] }
    ]
  },
  {
    category: 'Research & Learning',
    icon: ChatBubbleLeftRightIcon,
    color: 'bg-green-500',
    tools: [
      { name: 'Perplexity AI', description: 'AI search with citations', link: 'https://www.perplexity.ai', tags: ['Search'] },
      { name: 'Claude', description: 'AI assistant by Anthropic', link: 'https://claude.ai', tags: ['Assistant'] },
      { name: 'Consensus', description: 'AI for scientific papers', link: 'https://consensus.app', tags: ['Academic'] },
      { name: 'Elicit', description: 'AI research assistant', link: 'https://elicit.org', tags: ['Research'] },
      { name: 'Scholarcy', description: 'AI article summarizer', link: 'https://www.scholarcy.com', tags: ['Summarize'] },
      { name: 'Semantic Scholar', description: 'AI-powered research tool', link: 'https://www.semanticscholar.org', tags: ['Papers'] },
      { name: 'Scite', description: 'Smart citations', link: 'https://scite.ai', tags: ['Citations'] },
      { name: 'Connected Papers', description: 'Explore academic papers', link: 'https://www.connectedpapers.com', tags: ['Explore'] },
      { name: 'Explain Paper', description: 'AI paper explainer', link: 'https://www.explainpaper.com', tags: ['Explain'] },
      { name: 'Jenni AI', description: 'AI writing assistant for research', link: 'https://jenni.ai', tags: ['Writing'] },
      { name: 'Wordvice AI', description: 'AI proofreading', link: 'https://wordvice.ai', tags: ['Proofreading'] },
      { name: 'Trinka', description: 'AI writing assistant for academic', link: 'https://www.trinka.ai', tags: ['Academic'] },
      { name: 'Quillionz', description: 'AI question generator', link: 'https://www.quillionz.com', tags: ['Questions'] },
      { name: 'Socratic', description: 'AI homework helper', link: 'https://socratic.org', tags: ['Homework'] },
      { name: 'Wolfram Alpha', description: 'Computational knowledge engine', link: 'https://www.wolframalpha.com', tags: ['Math'] },
      { name: 'Photomath', description: 'Math problem solver', link: 'https://photomath.com', tags: ['Math'] }
    ]
  },
  {
    category: 'Productivity',
    icon: SparklesIcon,
    color: 'bg-yellow-500',
    tools: [
      { name: 'Otter.ai', description: 'AI meeting notes', link: 'https://otter.ai', tags: ['Meetings'] },
      { name: 'Notion AI', description: 'AI workspace', link: 'https://www.notion.so', tags: ['Workspace'] },
      { name: 'Mem', description: 'AI note-taking', link: 'https://mem.ai', tags: ['Notes'] },
      { name: 'Superhuman', description: 'AI email client', link: 'https://superhuman.com', tags: ['Email'] },
      { name: 'Clockwise', description: 'AI calendar assistant', link: 'https://www.getclockwise.com', tags: ['Calendar'] },
      { name: 'Motion', description: 'AI task manager', link: 'https://www.usemotion.com', tags: ['Tasks'] },
      { name: 'Reclaim AI', description: 'Smart calendar', link: 'https://reclaim.ai', tags: ['Calendar'] },
      { name: 'Fireflies.ai', description: 'AI meeting recorder', link: 'https://fireflies.ai', tags: ['Meetings'] },
      { name: 'Tactiq', description: 'Meeting transcript', link: 'https://tactiq.io', tags: ['Transcript'] },
      { name: 'Magical', description: 'AI text expander', link: 'https://www.getmagical.com', tags: ['Text Expansion'] },
      { name: 'Zapier', description: 'AI automation', link: 'https://zapier.com', tags: ['Automation'] },
      { name: 'Make', description: 'Visual automation', link: 'https://www.make.com', tags: ['Automation'] },
      { name: 'Taskade', description: 'AI productivity', link: 'https://www.taskade.com', tags: ['Productivity'] },
      { name: 'Todoist', description: 'AI task manager', link: 'https://todoist.com', tags: ['Tasks'] },
      { name: 'ClickUp AI', description: 'AI project management', link: 'https://clickup.com', tags: ['Project'] },
      { name: 'Asana AI', description: 'AI work management', link: 'https://asana.com', tags: ['Work'] }
    ]
  }
];
