import {
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Status from "./Status";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { updateProfileAction } from "../../redux/actions";
import { connect, useSelector } from "react-redux";
import { API_URL } from "../../helpers";

const Profile = ({ updateProfileAction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username, fullname, profilepicture, bio } = useSelector(
    (state) => state.user
  );

  const [input, setInput] = useState({
    fullname: fullname,
    username: username,
    profilepicture: profilepicture,
    bio: bio,
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [fileUpload, setUpload] = useState(null);

  const onFileChange = (e) => {
    if (e.target.files[0]) {
      setUpload(e.target.files[0]);
    } else {
      setUpload(null);
    }
  };

  const onSaveDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let insertData = {
      fullname: input.fullname,
      username: input.username,
      bio: input.bio,
    };
    formData.append("profilepicture", fileUpload);
    formData.append("data", JSON.stringify(insertData));
    updateProfileAction(formData);
    // console.log(`${API_URL}${profilepicture}`);
    onClose();
  };

  const ProfileBar = () => {
    return (
      <div className="bg-slate-100 rounded-lg shadow-md group ">
        <div
          className="grid grid-cols-4 font-bold text-center h-10
        cursor-pointer tracking-wide"
        >
          <div className="pt-2 hover:bg-slate-300 rounded-l-lg">Tea</div>
          <div className="pt-2 hover:bg-slate-300 ">Media</div>
          <div className="pt-2 hover:bg-slate-300 ">Likes</div>
          <div className="pt-2 hover:bg-slate-300 rounded-r-lg">Bookmark</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-10/12 px-20 py-4">
      <div className="bg-slate-100 rounded-lg shadow-md">
        <div className="px-5 py-2 bg-cyan-800 rounded-t-lg h-[23vh]">
          {/* header pic */}
        </div>
        <div className="absolute top-[25vh] left-[92vh] rounded-full border-4 border-slate-100">
          {profilepicture ? (
            <Avatar
              size="2xl"
              name="Dan Abrahmov"
              src={`${API_URL}${profilepicture}`}
            />
          ) : (
            <Avatar
              size="2xl"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
          )}
        </div>
        <div
          className="group absolute right-[50vh] mt-2 hover:bg-slate-200  p-2 rounded-lg cursor-pointer"
          onClick={onOpen}
        >
          <FiEdit className="text-xl text-slate-600 hover:text-cyan-900" />
        </div>

        {/* Edit profile modal */}
        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton className="mr-6 mt-7" />
            <ModalBody className="mb-5">
              <form onSubmit={onSaveDataHandle}>
                <div className="mt-5 h-[20vh] bg-cyan-800 rounded-t-lg"></div>
                <input
                  type="file"
                  className="hidden"
                  onChange={onFileChange}
                  id="profilepicture"
                  name="profilepicture" // image masih error
                  accept=".jpg,.jpeg,.png"
                />
                <label
                  for="profilepic"
                  type="button"
                  className="absolute top-[16vh] left-[8vh] rounded-full border-4 border-slate-100"
                >
                  <Avatar
                    size="xl"
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                </label>
                <div className=" px-9 pb-10 rounded-b-lg border-2 border-slate-100">
                  <div className="flex">
                    <div className="mt-14 mr-4">
                      <div className="mb-1 ml-1">Full name</div>
                      <Input
                        focusBorderColor="cyan.400"
                        placeholder="Fullname"
                        variant="filled"
                        htmlSize={26}
                        width="auto"
                        name="fullname"
                        value={input.fullname}
                        onChange={handleInput}
                        size={"md"}
                      />
                    </div>
                    <div className="mt-14 ml-4">
                      <div className="mb-1 ml-1">Username</div>
                      <Input
                        focusBorderColor="cyan.400"
                        placeholder="@username"
                        variant="filled"
                        htmlSize={26}
                        width="auto"
                        name="username"
                        value={input.username}
                        onChange={handleInput}
                        size={"md"}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="mb-1 ml-1">Bio</div>
                    <Textarea
                      focusBorderColor="cyan.400"
                      placeholder="Your bio here"
                      variant="filled"
                      resize="none"
                      name="bio"
                      value={input.bio}
                      onChange={handleInput}
                      isFullWidth={true}
                    />
                  </div>
                  <button
                    className=" mt-6 rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-300"
                    type="submit"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>

        <div className="text-center pt-20">
          <div className="font-bold text-2xl">{fullname}</div>
          <div className="text-md text-slate-600"> @{username}</div>
          <div className="mt-2 mx-28 italic pb-5">{bio}</div>
        </div>
      </div>
      <div className="mt-5">
        <ProfileBar />
        <Status />
      </div>
    </div>
  );
};

export default connect(null, { updateProfileAction })(Profile);
