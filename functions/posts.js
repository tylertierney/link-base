exports.handler = async (event, context) => {
  const posts = [
    { content: "Loving this summer sun with my family!", author: "Jen" },
    { content: "Just got a new job at Blizzard Games", author: "Brian" },
    { content: "I love elephants!!!!", author: "Molly" },
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
