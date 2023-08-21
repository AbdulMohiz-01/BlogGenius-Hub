const Blog = require('../models/blog');
const bodyParser = require('body-parser');

const SECRET_KEY = process.env.SECRET_KEY;

const getMeBlogLangChain = (title) => {
    const blogs = [
        "Meditation is a practice that has been gaining popularity in recent years for its numerous benefits to both the mind and body. By setting aside just a few minutes each day to meditate, you can experience reduced stress levels, improved focus, and a greater sense of inner calm. Studies have shown that meditation can actually rewire the brain, leading to better emotional regulation and increased overall well-being. Incorporating meditation into your routine doesn't require any special equipment or training; all you need is a quiet space and a willingness to explore your inner thoughts. So why not give meditation a try and unlock its transformative potential?",
        "With concerns about climate change and air pollution on the rise, electric vehicles (EVs) have emerged as a promising solution to reduce our carbon footprint. Unlike traditional gasoline-powered vehicles, EVs run on electricity stored in batteries, producing zero tailpipe emissions. This shift towards EVs not only helps combat air pollution but also decreases our dependence on fossil fuels. Many countries are now offering incentives to promote EV adoption, such as tax breaks and charging infrastructure development. As technology continues to improve, EVs are becoming more affordable, with longer ranges and faster charging times. Embracing electric vehicles is a crucial step towards creating a more sustainable and environmentally friendly transportation system.",
        "Journaling is a powerful tool that allows you to reflect on your thoughts, experiences, and emotions. It's more than just putting pen to paper; it's a way to gain insights into your own life and promote personal growth. By writing down your thoughts and feelings, you can better understand patterns in your behavior, track your goals, and find solutions to challenges you may be facing. Journaling can also serve as a creative outlet, helping you express yourself in ways you might not have considered before. Whether you prefer to journal daily or sporadically, the act of writing can be incredibly cathartic and therapeutic. So pick up a notebook and start your journaling journey to discover more about yourself and your aspirations."
    ];
    //  return a random blog from the array
    return blogs[Math.floor(Math.random() * blogs.length)];
}

// controller to generate and save a new blog post

const generateBlog = async (req, res) => {
    try {
        const { title } = req.body;
        const content = getMeBlogLangChain(title);
        const blog = new Blog({
            title,
            blog: content,
        });
        await blog.save();
        res.status(201).json({ content });
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

module.exports = {
    generateBlog,
    retrieveBlog,
}