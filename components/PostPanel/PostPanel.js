import { checkForSmallScreen } from "../../helperfunctions";

import { useState } from "react";

import { Flex, Container, Box } from "@chakra-ui/react";

import Post from "../Post/Post";

import postpanelstyles from "./postpanel.module.css";

const PostPanel = ({ panelIsShowing, setPanelIsShowing, post, postedBy }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(checkForSmallScreen());
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
      //   if (e.clientY) {
      //     console.log("mouse movement true");
      //     // MOUSE movement
      //     let boxY = parseInt(box.style.top, 10);
      //     setModalYValue(boxY);
      //     newBoxY = boxY + e.movementY + "px";
      //   } else {
      // TOUCH movement
      newBoxY = e.changedTouches[0].clientY - e.target.clientHeight / 2 + "px";
      //   }
      box.style.setProperty("top", newBoxY);
    }
  };

  const stopMoving = (e) => {
    e.stopPropagation();
    let box = e.currentTarget;
    setBoxIsMoving(false);
    console.log(modalYValue, parseInt(box.style.top, 10));

    if (parseInt(box.style.top, 10) > modalYValue) {
      setSlideAnimation(postpanelstyles.slideout);
      window.setTimeout(() => {
        setPanelIsShowing(false);
        hidePanel(e);
      }, 300);
    } else {
      box.style.setProperty("top", modalYValue);
    }
  };

  let eventHandlers;

  eventHandlers = {
    mousedown: (e) => startMoving(e),
    touchstart: (e) => startMoving(e),
    mouseup: (e) => stopMoving(e),
    touchend: (e) => stopMoving(e),
    mousemove: (e) => handleMouseMove(e),
    touchmove: (e) => handleMouseMove(e),
  };

  return (
    <>
      {panelIsShowing && isSmallScreen && (
        <Container
          position="fixed"
          top="2rem"
          left="0"
          minH="100vh"
          minw="100vw"
          backgroundColor="blackAlpha.600"
          zIndex="2"
          onClick={(e) => setPanelIsShowing(false)}
          className={postpanelstyles.smoothTransition}
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
            onMouseLeave={() => setBoxIsMoving(false)}
            className={`
            ${postpanelstyles.slidein} 
            
            ${postpanelstyles.modalContainer} 
            hideScrollbar`}
            className={slideAnimation}
          >
            <Box
              position="relative"
              height="36px"
              w="100%"
              borderTopRadius="lg"
              backgroundColor="whiteAlpha.700"
              onClick={(e) => e.stopPropagation()}
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
              <Post post={post} postedBy={postedBy} isPanel={true} />
              <p style={{ backgroundColor: "white" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla
              </p>
              <p style={{ backgroundColor: "white" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla
              </p>
            </Flex>
          </Flex>
        </Container>
      )}
    </>
  );
};

export default PostPanel;
