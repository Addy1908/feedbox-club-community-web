import React, { useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Scrollbars } from "react-custom-scrollbars";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link, useAsyncError } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Css PostBigModel.css (in profile folder)
import "../Profile/ProfileBigModel.css";
// Bootstrap
import Modal from "react-bootstrap/Modal";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

function PostBigModel({ openComment, setOpenComment, id }) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const [tempReply, setTempReply] = useState("");
  const [deleteComId, setDeleteComId] = useState("");
  const [replyId, setReplyId] = useState("");
  const [changeText, setText] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const [replyMsg, setReplyMsg] = useState("");
  const [postData, setPostData] = useState();
  const [commentId, setCommentId] = useState("");

  const [message, setMessage] = useState("");

  // popup to delete the reply
  const [show, setShow] = useState(false);

  // popup to delete the comment
  const [showDel, setShowDel] = useState(false);

  // To store deleted comment
  const [deleteVar, setDeleteVar] = useState("");

  //To hide the reply button after the reply is added\
  const [replyBtn,setReplyBtn]=useState(true);

  // To show reply input field
  const [showReplyInputField, setShowReplyInputField] = useState(false);

  // To store the state of set reply input field button
  const [replyInputBtnId,setReplyInputBtnId]=useState("");

  // To show the reply written by user
  const [showReply,setShowReply]=useState(true);

  // To show and hide "view reply" 
  const [checkReply,setCheckreply]=useState(true);

  // To show and hide "hide reply" 
  const [hideReply,setHidereply]=useState(false);

  // function handleFormSubmit(event){

  //   event.preventDefault();

  //   if(tempComment!="")
  //   {
  //   setComments((comment) => [...comment, tempComment]);
  //   // console.log(tempComment)
  //   setTempComment("");
  //   }
  // }

  function handleAfterReply(event) {
    event.preventDefault();
    if (tempReply != "") {
      // setReply(tempReply);
    }
  }
  // function showRep() {
  //   if (tempReply != "") {
  //     setReplyView("Show-Reply-View");
  //     setShowAdd("Hide-Comment-Add-Btn");
  //   }
  // }
  // to show and hide whole component
  const handleClose = () => {
    setOpenComment(false);
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
    setLoading(false);
  }, [id, loading]);

  const getPost = async () => {
    // console.log(id)
    let result = await fetch(`http://localhost:8000/userPost/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result)
    setUser(result);
    // if(result._id===id){
    //   getPost()
    // }
  };

  const [img, setImg] = useState();

  useEffect(() => {
    getUser();
    
  }, []);

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result)
    setImg(result.img)
    // setData(result);
    // setUserId(result._id)
  };

  const updateComment = () => {
    console.log(id, "", message);
    fetch("http://localhost:8000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ id, message }),
    })
      .then((res) => res.json())
      .then((result) => {
        // setPostData(result);
        console.log(result);
        setLoading(true);
        setMessage("");

        // const newData = data.map((item) => {
        //   if (item._id === result._id) {
        //     return result;
        //   } else {
        //     return item;
        //   }
        // });
        // setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(commentId, "", replyMsg);


  const updateReply = () => {
    console.log(commentId, "", replyMsg);
    fetch(`http://localhost:8000/reply/${commentId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ id, replyMsg }),
    })
      .then((res) => res.json())
      .then((result) => {
        // setPostData(result)
        console.log(result);
        setLoading(true);
        setReplyMsg("");

        // const newData = data.map((item) => {
        //   if (item._id === result._id) {
        //     return result;
        //   } else {
        //     return item;
        //   }
        // });
        // setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(deleteComId," ",id);

  //delete comment
  const deleteComment = async (deleteComId) => {
    console.log(deleteComId," ",id);
    let result = await fetch(`http://localhost:8000/commentDel/${deleteComId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({id}),
    });

    result = await result.json();
    console.log(result)
    setLoading(true);

    // if (result) {
    //   updateComment();
    // }
  };

  const deleteReply = async (replyId) => {
    console.log(replyId," ",id);
    let result = await fetch(`http://localhost:8000/replyDel/${replyId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({id,commentId}),
    });

    result = await result.json();
    console.log(result)
    setLoading(true);

    // if (result) {
    //   updateComment();
    // }
  };



  // To show and hide delete comment model
  const handleCloseDelete = () =>{ 
    setShow(false)
    setShowDel(false)
  }
  const handleShowDelete = () => setShowDel(true);
  const handleShowDeleteReply = () => setShow(true);

  return (
    <>
      {/* Model to delete the comment */}
      <Modal
        show={showDel}

        // onHide={handleCloseDelete}
        
        className="edit-modal-container"
      >
        <Modal.Body className="modal-dialog1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              className="delete-btn"
               onClick={
                ()=>{ deleteComment(deleteComId)
                  handleCloseDelete()
                }}>
              OK
            </button>
            <button className="delete-btn" onClick={handleCloseDelete}>
              Cancel
            </button>
          </div>
          </Modal.Body>
        
        </Modal>







      <Modal
        show={show}
        onHide={handleShowDeleteReply}
        className="edit-modal-container"
      >
        <Modal.Body className="modal-dialog1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              className="delete-btn"
               onClick={
                ()=>{
                  
                  deleteReply(replyId)
                  handleCloseDelete()
                }

              }
            >
              Delete Reply
            </button>
            <button className="delete-btn" onClick={handleCloseDelete}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {openComment ? (
        <div className="Post-Big-Model-container">
          {/* to close the model on click out side the post section */}
          <div className="Post-Big-Model-Close" onClick={handleClose}></div>

          <div className="Post-Big-Model1">
            {/* Left side */}
            <div className="post-display2" 
            // style={{maxHeight:"600px"}}
            >
              <div className="post-display-center1">
                <div className="post-display-image "></div>

                {/* ***carousel for web view*** */}
                <div className="post-display-image flex justify-center">
                  <div className="post-display-carousel-webview1 flex justify-center">
                    <Carousel
                      thumbWidth={60}
                      className="w-[30vw]"
                      autoPlay
                      interval="5000"
                      infiniteLoop={true}
                      dynamicHeight
                    >
                      {
                        user && user.img.map((data)=>
                        <div key={data._id} style={{maxHeight:"400px"}}>
                        <img className="display-img" src={data} style={{maxHeight:"400px",objectFit:"contain"}} />
                      </div>
                        )
                      }

                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
            {/* </section> */}

            {/* Right side */}
            <section className="Post-Big-Model-Right">
              <div className="Post-Big-Model-Profile">
                <div className="Post-Big-Pro">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: "fit-content",
                      width: "95%",
                    }}
                  >
                    <div className="Post-Big-Pro-img">
                      <img
                        src={user && user.postedBy && user.postedBy.img}
                        alt="profile image"
                      ></img>
                    </div>
                    <div className="Post-Big-Title">
                      <div className="Post-Big-Title1">
                        {user && user.postedBy && user.postedBy.name}
                      </div>
                      <div className="Post-Big-Title2">{user && user.postedBy && user.postedBy.role}</div>
                    </div>
                  </div>
                  <Link
                    to="/main"
                    className="Cancel-Icon-Container"
                    style={{ textDecoration: "none" }}
                  >
                    <FontAwesomeIcon
                      className="fa-lg"
                      icon={faXmark}
                      onClick={handleClose}
                    />
                  </Link>
                </div>
                {/* Description */}
                {/* <div className="Post-Big-Description">{user && user.desc}</div> */}
              </div>

              {/* Line to seprate pofile and comment */}
              {/* <div className="Post-Big-Line"></div> */}

              {/* Comment part */}
              
              <div className="Post-Big-Comment">
                
                {
                  user && user.comment.length==0?(
                  <div style={{textAlign:"center",
                  fontSize:"1.1rem",fontWeight:'600'
                  
                }}>No comment</div>):(
                    <Scrollbars className="Scrollbar-height" style={{height:"102%",position:"relative"}} >
                  {/* Comment 1 */}
                  {user &&
                    user.comment.map((item) => (
                      <section className="Post-Comment-About" key={item._id}>
                        {/* Left part */}
                        <div className="Comment-Left">
                          <img className="object-contain"
                            src={item && item.postedBy && item.postedBy.img}
                          ></img>
                        </div>

                        {/* Right part */}
                        <div className="Comment-Right">
                          <div className="Comment-Right-Top">
                            <div className="Comment-Right-User-Name">
                              {item && item.postedBy && item.postedBy.name}
                            </div>
                            <div className="Right-Comment">{item.message}</div>
                          </div>

                          <div className="Comment-Right-Down">
                            <span className="Comment-Down-Other" 
                            // onClick={()=>{console.log(item.reply.length)}}
                            >{item && item.date && timeAgo.format(new Date(item.date).getTime() - 60 * 1000)}</span>
                            <span
                                className="Comment-Down-Other Comment-Down-Other1"
                                onClick={() => {
                                  handleShowDelete();
                                  setDeleteComId(item._id);
                                  console.log(item._id)
                                }}
                                style={{ marginLeft: "20px" }}
                              >delete
                            </span>
                            {<span
                                className="Comment-Down-Other Comment-Down-Other1 "
                                onClick={() => {
                                  setShowReplyInputField(!showReplyInputField)
                                    // alert(showReplyInput)
                                  setCommentId(item._id);
                                  console.log(item._id);
                                  
                                }}
                              >
                                reply
                             </span>}
                          </div>
                  {/* ******** Section which will contain the reply on a comment****** */}
                        { showReply==true && commentId==item._id?(
                           <section style={{display:"flex",flexDirection:"column",marginTop:"10px"}}>
                           {
                            item && item.reply.map((data)=>
                            <div style={{display:"flex",flexDirection:"row"}}>
                            <div className="Comment-Left">
                            <img
                            className="object-contain"
                            src={item && item.postedBy && item.postedBy.img}
                            ></img>
                            </div>
                            <div key={data._id} className="Comment-Right">
                              <div className="Comment-Right-Top">
                              <div className="Comment-Right-User-Name">
                                {data && data.postedBy && data.postedBy.name}
                              </div>
                              <div className="Right-Comment"> {data && data.replyMsg}</div>
                            </div>
                            <div className="Comment-Right-Down">
                              <span className="Comment-Down-Other">{data && data.date && timeAgo.format(new Date(data.date).getTime() - 60 * 1000)}</span>
                              <span
                                className="Comment-Down-Other Comment-Down-Other1"
                                onClick={() => {
                                  handleShowDeleteReply();
                                  setReplyId(data._id);
                                  

                                }}
                                style={{ marginLeft: "20px" }}
                              >
                                delete
                              </span>
                          </div>
                            </div>
                            </div>
                            )
                           }   
                          </section>
                            ):("")
                        }
                          {/* **Hide and show reply** */}

                          {
                          item.reply.length>0 && checkReply==true && showReply!=true? (
                            <span onClick={()=>{
                              setShowReply(true)
                              setCheckreply(false)
                              setHidereply(true);
                              setCommentId(item._id);
                              setShowReply(true)
                              setCheckreply(false);
                            }}
                            style={{
                              cursor:"pointer",
                              marginLeft:"20px"
                            }}
                            >
                              ---- View Reply
                            </span>
                          ):(
                            hideReply==true && commentId==item._id && item.reply.length>0?(<>
                              <span onClick={()=>{
                               setHidereply(false)
                               setCheckreply(true)
                               setShowReply(false)
                               setCheckreply(true)
                               setCommentId("")
                               // setShowReply(true)
 
                              }}
                              style={{
                               cursor:"pointer",
                               marginLeft:"20px"
                              }}
                              >
                                 ---- Hide Reply
                               </span>
                               </>):( item.reply.length>0?(

                               
                                 <span onClick={()=>{
                                  setShowReply(true)
                                  setCheckreply(false)
                                  setHidereply(true);
                                  setCommentId(item._id);
                                  setShowReply(true)
                                  setCheckreply(false);
                                }}
                                style={{
                                  cursor:"pointer",
                                  marginLeft:"20px"
                                }}
                                >
                                  ---- View Reply
                                </span>):("")
                               )
                          )
                          }

                          {showReplyInputField === true && item._id === commentId ? (
                            <div className="Show-comment-Add-Btn">
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                 
                                }}
                              >
                                <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700">
                                  <div className="rounded-lg cursor-pointer hover:text-black-900 hover:bg-gray-100 dark:text-black-400 dark:hover:text-black dark:hover:bg-gray-600"></div>
                                  <input
                                    className="block border-solid  mx-2 p-2.5 w-full text-sm text-black-600 bg-white  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 border-black-600"
                                    placeholder="Reply..."
                                    value={replyMsg}
                                    onChange={(event) =>
                                      setReplyMsg(event.target.value)
                                    }
                                    
                                 
                                  ></input>
                                  <button
                                    onClick={() => {
                                      updateReply();
                                      setShowReplyInputField(false)
                                      setReplyInputBtnId(item._id)
                                      setReplyBtn(false)
                                      if(replyMsg!="")
                                      {
                                        setCheckreply(true)
                                      }
                                    }  
                                    }
                                    type="button"
                                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                                  >
                                    <svg
                                      aria-hidden="true"
                                      className="w-6 h-6 rotate-90"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                  </button>
                                </div>
                              </form>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </section>
                    ))}
                </Scrollbars>
                  )
                }

                
              </div>

              <div className="Post-Big-Comment-Container ml-4">
                <div className="Comment-Add-Section">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if(message=="")
                      {     }
                      else
                      { updateComment();  }
                    }}
                  >
                    <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700 ">
                      <div className=" rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <img
                          src={img}
                          aria-hidden="true"
                          className="w-10 h-8
                            p-0
                            rounded-full
                            object-cover	
                            "
                        ></img>
                      </div>
                      <input
                        className="block mx-2 p-2.5 w-full text-sm rounded-lg border text-black"
                        style={{ border: "2px solid black" }}
                        placeholder="Add a comment..."
                        value={message}
                        onChange={
                          (event) => setMessage(event.target.value)
                        }
                      ></input>
                      <button
                        type="submit"
                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6 rotate-90"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default PostBigModel;