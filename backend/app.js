const express = require("express");
require("dotenv").config();
require("./src/db/connection");
const cors = require("cors");
const { News, User } = require("./src/model/newsdetails");

const app = express();
app.use(express.json());

// Enable CORS with specific client URL
const corsOptions = {
  origin: process.env.CLIENT_URL, // Replace with your actual client URL
  methods: "GET,POST,PATCH,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 8000;

// For creating data or post data.
app.get("/", (req, res) => {
  res.send("Welcome to the news API");
});

app.post("/news", (req, res) => {
  const user = new News(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
});

// For get data
app.get("/news", async (req, res) => {
  try {
    const newsData = await News.find();
    res.send(newsData);
  } catch (e) {
    res.send(e);
  }
});

// For getting individual news by id:
app.get("/news/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const newsData = await News.findById(_id);
    res.send(newsData);
  } catch (e) {
    res.send(e);
  }
});

// For getting news by category
app.get("/news/category/:key", async (req, res) => {
  try {
    const category = req.params.key;
    const newData = await News.find({ category: `${category}` });
    res.send(newData);
  } catch (e) {
    res.send(e);
  }
});

// For updating a news item by id
app.patch("/news/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = await News.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateData);
  } catch (e) {
    console.log(e);
  }
});

// For deleting news by id
app.delete("/news/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteData = await News.findByIdAndDelete(_id);
    if (!_id) {
      res.status(400).send();
    } else {
      res.send(deleteData);
    }
  } catch (e) {
    console.log(e);
  }
});

// For updating like button by id
app.patch("/news/addlike/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = await News.findByIdAndUpdate(
      { _id },
      {
        $push: {
          like: req.body,
        },
      },
      {
        new: true,
      }
    );
    res.send(updateData);
  } catch (e) {
    console.log(e);
  }
});

// For dislike button
app.patch("/news/dellike/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = await News.findByIdAndUpdate(
      { _id },
      {
        $pull: {
          like: req.body,
        },
      },
      {
        new: true,
      }
    );
    res.send(updateData);
  } catch (e) {
    console.log(e);
  }
});

// For saving articles in news data
app.patch("/news/addart/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = await News.findByIdAndUpdate(
      { _id },
      {
        $push: {
          art: req.body,
        },
      },
      {
        new: true,
      }
    );
    res.send(updateData);
  } catch (e) {
    console.log(e);
  }
});

// For removing articles
app.patch("/news/delart/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = await News.findByIdAndUpdate(
      { _id },
      {
        $pull: {
          art: req.body,
        },
      },
      {
        new: true,
      }
    );
    res.send(updateData);
  } catch (e) {
    console.log(e);
  }
});

// For updating view button by id
app.patch("/news/view/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const obj2 = await News.findById(_id).select({ view: 1, _id: 0 });
    const updateData = await News.findByIdAndUpdate(
      _id,
      {
        view: obj2.view + 1,
      },
      {
        new: true,
      }
    );
    res.send(updateData);
  } catch (e) {
    console.log(e);
  }
});

// To save user information
app.post("/user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
});

// To get articles from user
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findOne({ id: `${id}` });
    res.send(userData);
  } catch (e) {
    console.log(e);
  }
});

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).send("Error: Page not found");
});

// Starting the server
app.listen(port, () => {
  console.log(`Connection is done with ${port}`);
});
