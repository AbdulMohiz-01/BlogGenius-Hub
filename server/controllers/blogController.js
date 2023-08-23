const { OpenAI } = require("langchain/llms/openai");
const { LLMChain } = require("langchain/chains");
const { PromptTemplate } = require("langchain/prompts");

const Blog = require('../models/blog');
const bodyParser = require('body-parser');

const SECRET_KEY = process.env.SECRET_KEY;

const getMeBlogLangChain = async (title) => {



    const llm = new OpenAI({
        openAIApiKey: SECRET_KEY,
        temperature: 0.7,
        maxTokens: 150,
    });
    const prompt = PromptTemplate.fromTemplate("Write the blog on the title: {title}");

    const chain = new LLMChain({
        llm,
        prompt
    });

    // Run is a convenience method for chains with prompts that require one input and one output.
    const result = await chain.run(title);
    return result;


}

// controller to generate and save a new blog post

const generateBlog = async (req, res) => {
    try {
        const { title } = req.body;
        const content = await getMeBlogLangChain(title);
        console.log(content)
        const blog = new Blog({
            title,
            blog: content,
        });
        await blog.save();
        res.status(201).json({ content, title });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const retrieveBlog = async (req, res) => {
    try {
        const blogs = await Blog.find();
        console.log(blogs);
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteAllBlogs = async (req, res) => {
    try {
        await Blog.deleteMany();
        res.status(200).json({ message: "All blogs deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    generateBlog,
    retrieveBlog,
    deleteAllBlogs,
}