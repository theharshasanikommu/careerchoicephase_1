# 🤖 AI Career Chatbot Setup

## ✅ What's Been Added

Your Careers page now has an **AI-powered career advisor chatbot** that can answer questions about:
- Career paths and skills needed
- Job market trends
- Education requirements
- Career transitions
- Professional development

---

## 🔑 Get Your OpenAI API Key

### Step 1: Create OpenAI Account

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Click "Sign Up" (or "Log In" if you have an account)
3. Complete the registration

### Step 2: Get API Key

1. Go to [API Keys page](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Give it a name (e.g., "CareerChoice Chatbot")
4. **Copy the key immediately** (you won't see it again!)
5. It looks like: `sk-proj-xxxxxxxxxxxxxxxxxxxxx`

### Step 3: Add Credits (if needed)

- OpenAI gives **$5 free credits** for new accounts
- After that, you need to add payment method
- GPT-3.5-turbo is very cheap: ~$0.002 per conversation
- Go to [Billing](https://platform.openai.com/account/billing/overview)

---

## ⚙️ Configure Your App

### Add API Key to .env

Edit `.env` file in your project root:

```env
VITE_OPENAI_API_KEY=sk-proj-your-actual-key-here
```

**Example:**
```env
VITE_API_URL=http://localhost:5001/api
VITE_OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

### Restart Frontend

```bash
# Stop the dev server (Ctrl+C)
# Start again
npm run dev
```

---

## 🧪 Test the Chatbot

1. Open http://localhost:5173/careers
2. You'll see the AI Career Advisor chat interface
3. Try asking:
   - "What skills do I need for data science?"
   - "How do I become a software engineer?"
   - "What's the job market like for UX designers?"

---

## 🎨 Features

### Chat Interface:
- ✅ Real-time AI responses
- ✅ Beautiful chat bubbles
- ✅ Suggested questions
- ✅ Loading animation
- ✅ Smooth scrolling
- ✅ Dark mode support

### AI Capabilities:
- ✅ Career path guidance
- ✅ Skills recommendations
- ✅ Job market insights
- ✅ Education advice
- ✅ Career transition help

---

## 💰 Cost Estimate

**GPT-3.5-turbo pricing:**
- Input: $0.0015 per 1K tokens
- Output: $0.002 per 1K tokens

**Average conversation:**
- ~500 tokens per question/answer
- Cost: ~$0.001 per message
- **100 messages = $0.10** (10 cents!)

Very affordable for a student project! 🎉

---

## 🔒 Security Notes

### ⚠️ Important:

1. **Never commit .env to Git**
   - Already in `.gitignore`
   - Keep your API key secret

2. **For Production:**
   - Move API calls to backend
   - Add rate limiting
   - Implement user authentication

3. **Current Setup:**
   - API key is in frontend (okay for development)
   - Anyone can see it in browser DevTools
   - Fine for learning, not for production

---

## 🚀 Alternative: Use Backend API

For better security, you can move the OpenAI call to your backend:

### Backend Route (optional):

```typescript
// backend/src/routes/chatRoutes.ts
router.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    })
  });
  
  const data = await response.json();
  res.json(data);
});
```

---

## 🐛 Troubleshooting

### Error: "Failed to get response"

**Check:**
1. API key is correct in `.env`
2. API key starts with `sk-proj-` or `sk-`
3. You have credits in your OpenAI account
4. Frontend is restarted after adding key

### Error: "Insufficient credits"

**Solution:**
- Add payment method to OpenAI account
- Or use the $5 free credits wisely

### API key not working?

**Try:**
```bash
# Check if env variable is loaded
console.log(import.meta.env.VITE_OPENAI_API_KEY)
```

---

## 🎯 What's Next?

Your AI Career Advisor is ready! Just:

1. Get OpenAI API key
2. Add to `.env` file
3. Restart frontend
4. Start chatting!

**Enjoy your AI-powered career guidance! 🚀**
