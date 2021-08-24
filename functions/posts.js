exports.handler = async (event, context) => {
  const posts = [
    {
      content: "Loving this summer sun with my family!",
      author: "Jen",
      prof_pic:
        "https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
      id: 234876155234768,
    },
    {
      content: "Just got a new job at Blizzard Games",
      author: "Brian",
      prof_pic:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      id: 8762345469299,
    },
    {
      content: "I love elephants!!!!",
      author: "Molly",
      prof_pic:
        "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80",
      id: 09846667293555,
    },
  ];

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(posts),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ mssg: "you must be logged in to see this content" }),
  };
};
