// import { checkForSmallScreen } from "../../helperfunctions";

import { useEffect, useState } from "react";

import { Flex, Container, Box } from "@chakra-ui/react";

import Post from "../Post/Post";

import postpanelstyles from "./postpanel.module.css";

const PostPanel = ({
  isGuest,
  isSponsored,
  panelIsShowing,
  setPanelIsShowing,
  post,
  postedBy,
  user,
}) => {
  useEffect(() => {
    if (window.innerWidth < 600) {
      setIsSmallScreen(true);
    }
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [boxIsMoving, setBoxIsMoving] = useState(false);
  const [modalYValue, setModalYValue] = useState(90);
  const [slideAnimation, setSlideAnimation] = useState(postpanelstyles.slidein);

  const hidePanel = (e) => {
    e.stopPropagation();
    setPanelIsShowing(false);
    // preventScrollOnBody("allow");
  };

  const startMoving = (e) => {
    e.stopPropagation();
    setBoxIsMoving(true);
  };

  const handleMouseMove = (e) => {
    e.stopPropagation();
    let box = e.currentTarget;
    let newBoxY;
    if (boxIsMoving) {
      newBoxY = e.changedTouches[0].clientY - e.target.clientHeight / 2 + "px";
      box.style.setProperty("top", newBoxY);
    }
  };

  const stopMoving = (e) => {
    e.stopPropagation();
    let box = e.currentTarget;
    setBoxIsMoving(false);

    if (parseInt(box.style.top, 10) > modalYValue) {
      setSlideAnimation(postpanelstyles.slideout);
      window.setTimeout(() => {
        setPanelIsShowing(false);
        setSlideAnimation(postpanelstyles.slidein);
      }, 200);
    } else {
      box.style.setProperty("top", modalYValue);
    }
  };

  const eventHandlers = {
    // mousedown: (e) => startMoving(e),
    touchstart: (e) => startMoving(e),
    // mouseup: (e) => stopMoving(e),
    touchend: (e) => stopMoving(e),
    // mousemove: (e) => handleMouseMove(e),
    touchmove: (e) => handleMouseMove(e),
  };

  console.log(panelIsShowing);

  return (
    <>
      {panelIsShowing && (
        // && isSmallScreen
        <Container
          position="fixed"
          top="2rem"
          left="0"
          minH="100vh"
          minW="100vw"
          backgroundColor="blackAlpha.600"
          zIndex="2"
          onClick={(e) => setPanelIsShowing(false)}
          className={
            panelIsShowing
              ? postpanelstyles.smoothTransition
              : postpanelstyles.blackOverlay
          }
        >
          <Flex
            backgroundColor="gray.100"
            position="fixed"
            top="20vh"
            left="50%"
            transform="translate(-50%)"
            minW="96vw"
            minH="80vh"
            maxH="80vh"
            zIndex="3"
            onClick={(e) => e.stopPropagation()}
            direction="column"
            borderTopRadius="lg"
            onMouseDown={eventHandlers.mousedown}
            onTouchStart={eventHandlers.touchstart}
            onMouseUp={eventHandlers.mouseup}
            onTouchEnd={eventHandlers.touchend}
            onMouseMove={eventHandlers.mousemove}
            onTouchMove={eventHandlers.touchmove}
            // onMouseLeave={() => setBoxIsMoving(false)}
            className={slideAnimation}
          >
            <Box
              position="relative"
              height="36px"
              w="100%"
              borderTopRadius="lg"
              backgroundColor="whiteAlpha.700"
              onClick={(e) => e.stopPropagation()}
              boxShadow="0px 4px 20px 1px rgb(0, 0, 0, 0.2)"
            >
              <Flex
                justify="center"
                w="100%"
                h="100%"
                align="center"
                onClick={(e) => e.stopPropagation()}
              >
                <Box
                  w="50%"
                  h="3px"
                  backgroundColor="blackAlpha.900"
                  borderRadius="lg"
                  onClick={(e) => e.stopPropagation()}
                ></Box>
              </Flex>
            </Box>
            <Flex
              direction="column"
              overflowY="scroll"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              className="hideScrollbar"
              overflowX="hidden"
            >
              <Post
                isGuest={isGuest}
                user={user}
                isSponsored={isSponsored}
                post={post}
                postedBy={postedBy}
                isPanel={true}
              />
              <p style={{ minHeight: "400px" }}></p>
            </Flex>
          </Flex>
        </Container>
      )}
    </>
  );
};

export default PostPanel;
