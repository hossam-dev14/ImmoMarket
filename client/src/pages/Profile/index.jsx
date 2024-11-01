import { useEffect, useState, useRef } from "react";
import Layout from "../../Layout/DashLayout";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../store/user/apiSlice";
import { setUserInfo } from "../../store/user/authSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [username, setUsername] = useState(userInfo?.data?.username);
  const [email, setEmail] = useState(userInfo?.data?.email);
  const [phone, setPhone] = useState(userInfo?.data?.phone);

  // Assuming you have a file input for avatar upload
  const [avatar, setAvatar] = useState(userInfo?.data?.avatar);
  const [passwordShown, setPasswordShown] = useState(false);
  const [imageForDisplay, setImageForDisplay] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (!userInfo) return navigate("/signin");
  }, [userInfo, navigate]);

  const togglePassword = () => setPasswordShown(!passwordShown);

  if (!userInfo) return toast.error("Not logged in!");

  const handleChangeImage = (e) => {
    setAvatar(e.target.files[0]);
    setImageForDisplay(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);

      const res = await updateUser(formData).unwrap();
      dispatch(setUserInfo(res));

      toast.success(res?.seccuss);
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  return (
    <Layout>
      <section className="w-full h-full">
        <div className="container mx-auto px-4 my-12 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full sm:w-2/3 md:max-w-96 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-white  border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <strong className="text-secondary sm:text-3xl text-2xl font-bold title-font mb-2">
                      Update profile
                    </strong>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-6 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleUpdate}>
                    {/* Image */}
                    <div className="relative w-full mb-6 ">
                      <input
                        type="file"
                        hidden
                        ref={fileRef}
                        accept="image/*"
                        name="avatar"
                        onChange={handleChangeImage}
                      />
                      <img
                        src={!imageForDisplay ? avatar : imageForDisplay}
                        alt="Avatar"
                        onClick={() => fileRef.current.click()}
                        className=" w-1/3 mx-auto cursor-pointer rounded-full hover:shadow-lg shadow-md hover:border-2 border-gray-300"
                      />
                    </div>
                    {/* Username */}
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        username
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Username"
                        style={{ transition: "all .15s ease" }}
                        value={username}
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                      />
                    </div>
                    {/* Email */}
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        style={{ transition: "all .15s ease" }}
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </div>
                    {/* Phone number */}
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        phone number
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        style={{ transition: "all .15s ease" }}
                        placeholder="Phone number"
                        value={phone}
                        name="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="numder"
                      />
                    </div>
                    {/* Current Password */}
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Current Password
                      </label>
                      <input
                        type={passwordShown ? "text" : "password"}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Current Password"
                        style={{ transition: "all .15s ease" }}
                        name="currentPassword"
                        autoComplete="current-password"
                      />
                      <span
                        onClick={togglePassword}
                        className="text-gray-700 text-2xl absolute right-3 top-[53%] "
                      >
                        {passwordShown ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </span>
                    </div>
                    {/* The new Password */}
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        New Password
                      </label>
                      <input
                        type={passwordShown ? "text" : "password"}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="New Password"
                        style={{ transition: "all .15s ease" }}
                        name="newPassword"
                        autoComplete="new-password"
                      />
                    </div>
                    {/* Submit button */}
                    <div className="text-center mt-10">
                      <button
                        className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style={{ transition: "all .15s ease" }}
                      >
                        {isLoading ? "Loading..." : "Update"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
