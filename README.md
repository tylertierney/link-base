# Linkbase

LinkBase is a full-stack social media project, similar to Facebook or Instagram. Users can post status updates, photos, tag their current location, customize their profiles, and interact with content from other users.

The site was created using React and Next.js.

## User Auth

User authentication is provided by Netlify Identity. However, rather than using Netlify's built-in Identity Widget, I used the underlying package GoTrue-JS in order to customize the sign-up and log-in forms, while maintaining device-level persistence.

Within the "context" directory, you'll find the authContext wrapper I've created so that all child components have access to the user object and relevant functions.

## Frontend

I use Chakra UI, so almost all styling is written in-line with the JSX. I extended the Chakra theme provider to include brand colors and remove some default styling behaviors.

There may be one or two css.module files, but I typically only use CSS files to overcome tricky responsive styling, or use a breakpoint that isn't one of the Chakra UI default breakpoints.

## Backend

The API is built using MongoDB/Mongoose; routing and middlewares are developed using dynamic routes within the "Pages" directory.

## Amazon S3

The NewPost and EditProfile components contain file inputs for images. All images are uploaded to an Amazon S3 bucket after passing a security check, wherein a unique URL is generated and then delivered to MongoDB, updating the user object accordingly.

## Feed Component

Users can choose to browse their personalized feed (content from only the users they follow) or the global feed located in the "Discovery" tab.

The Feed component is by far the largest and most complex component in the project. The Feed reads different user selections and user preferences (Discover or personalized feed, sorting by popular or new, following/not following) to create an array of Post components.

I also developed a method for dynamic ad insertion. It currently delivers pre-built sponsored posts at a rate of 1 ad per 6 organic posts, with a buffer at the top of the feed. Each sponsored post component allows for personalized call-to-action links, which are represented by a button in the bottom right corner of the posted image.

## Post Component

Post is the second-most complex component. In addition to the expected features of a social media post, the options menu renders different choices based on the logged-in user and whether or not they are following the user who created the post.

Currently, posts support image uploads, text, and a current location. I plan on adding the ability to post links and maybe some sort of "topic" tag (similar to a hashtag) in the future.

Upon clicking or tapping the post, a Post Panel component slides in from the bottom of the screen, expanding the view to display the full comment section, rather than just a preview.

Each Post component can be swiped left upon the image or text area to hide the post, or users can select the "hide" or "show" option in the menu.

I wanted to try using Navigator.vibrate() in order to provide tactile feedback upon hiding a post, but discovered that many browsers don't support the vibrate function, so that's something I'll consider in a potential port to React Native.

## PWA

Some modifications to the manifest.json, as well as creation of a logo and icons, allow the application to be used as a PWA. Because of this, users can add the app to their home screen on mobile.
