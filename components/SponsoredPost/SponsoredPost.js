import Post from "../Post/Post";

const spect_likes = new Array(7833).fill("");
const budweiser_likes = new Array(2429).fill("");

export const ads = [
  [
    {
      prof_pic_url:
        "https://media-exp1.licdn.com/dms/image/C4E0BAQEhy3KpAekjWA/company-logo_200_200/0/1590770722145?e=2159024400&v=beta&t=tmcAFjRhx66VA7cYkL9Vjfj34IH1a4qaEq-6ho-nqQU",
      cover_photo_url:
        "https://media-exp1.licdn.com/dms/image/C4E0BAQEhy3KpAekjWA/company-logo_200_200/0/1590770722145?e=2159024400&v=beta&t=tmcAFjRhx66VA7cYkL9Vjfj34IH1a4qaEq-6ho-nqQU",
    },
    {
      likes: spect_likes,
      comments: [],
      author: "Spect",
      location: "",
      photoURL:
        "https://images.squarespace-cdn.com/content/v1/5ea823f06060da6aee5ab992/1592865619835-XNZWM8QGMWDAJXQQGMM2/Spect%2Bbase%2Bvector-%2Bwhite-01.jpg?format=500w",
      posted_at: "2021-09-01T20:14:37.615Z",
      text: "",
      userid: "9",
      _id: 123456789,
      cta: "Get Started",
    },
  ],
  [
    {
      prof_pic_url:
        "https://us.budweiser.com/content/dam/brand-template/budweiser/logos/BudweiserLogo.png",
      cover_photo_url:
        "https://us.budweiser.com/content/dam/brand-template/budweiser/logos/BudweiserLogo.png",
    },
    {
      likes: budweiser_likes,
      comments: [],
      author: "Budweiser",
      location: "",
      photoURL:
        "https://d3nuqriibqh3vw.cloudfront.net/styles/aotw_card_ir/s3/main_r_14.jpg?Imldhxr1409UkSc7e9Pmd4QUjzwdz6tO&itok=WBBmFDtk",
      posted_at: "2021-09-01T20:14:37.615Z",
      text: "",
      userid: "747ef251-dd2a-4408-a904-e89e9b131379",
      _id: 12345678,
      cta: "Buy Online",
    },
  ],
];

const SponsoredPost = ({ post, postedBy, user, isGuest, isOwnPost }) => {
  return (
    <Post
      isOwnPost={isOwnPost}
      isGuest={isGuest}
      user={user}
      isSponsored={true}
      post={post}
      postedBy={postedBy}
      isPanel={false}
    />
  );
};

export default SponsoredPost;
