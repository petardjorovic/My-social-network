import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { formatDate } from '../utils/formatDate';
import { routesConfig } from '../config/routesConfig';
import { useDispatch, useSelector } from 'react-redux';
import { handlePostLike } from '../services/likeService';
import { toast } from 'react-toastify';
import { showLoader } from '../store/loaderSlice';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';
import DeletePostModal from '../components/DeletePostModal';
import useLockScroll from '../utils/useLockScroll';

function PostCard({ post, rerenderView }) {
    const location = useLocation();
    const { user } = useSelector((state) => state.userStore);
    const dispatch = useDispatch();
    const [isDeletePostModal, setIsDeletePostModal] = useState(false);
    useLockScroll(isDeletePostModal);

    const handleLike = async (userLike) => {
        dispatch(showLoader(true));
        const res = await handlePostLike(post._id, userLike);
        dispatch(showLoader(false));
        if (res?.status === 'success') {
            rerenderView();
        } else {
            toast(res?.message || 'Something went wrong', {
                type: 'error',
                toastId: 1,
            });
        }
    };

    return (
        <div className="w-full md:w-[260px] lg:w-[300px] h-[420px] rounded-lg shadow-xl relative overflow-hidden">
            {/* Header: User Info */}
            <div className="absolute top-0 left-0 w-full bg-black bg-opacity-70 py-2 px-3 text-white text-sm font-semibold">
                <Link to={routesConfig.POST_AUTHOR.realPath(post.userId)} className="hover:underline">
                    {post.user ? `${post.user.firstName} ${post.user.lastName}` : 'Unknown'}
                </Link>
            </div>

            {/* Post Image */}
            <img src={post.image} alt="Post" className="w-full h-[55%] object-cover transition-all duration-300 hover:scale-105" />

            {/* Content: Tags and Title */}
            <div className="flex flex-col h-[45%] px-4 py-3 justify-between">
                <div className="mb-2 text-sm text-gray-500">
                    {post.tags.map((tag) => (
                        <Link key={tag.name} to={routesConfig.POST_TAG.realPath(tag.name)} className="mr-2 hover:text-mainBlue">
                            #{tag.name}
                        </Link>
                    ))}
                </div>

                <p className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</p>

                {/* Read More Button */}
                <Link
                    to={routesConfig.SINGLE_POST.realPath(post._id)}
                    className="bg-mainBlue text-white py-2 px-4 rounded-md text-center transition duration-300 ease-in-out hover:bg-darkBlue"
                >
                    Read More
                </Link>

                {/* Footer: Likes and Date */}
                <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                        {post.likes.map((el) => el.userId).includes(user?._id) ? (
                            <BiSolidLike size={20} className="cursor-pointer text-mainBlue" onClick={() => handleLike('dislike')} />
                        ) : (
                            <BiLike size={20} className="cursor-pointer text-gray-500" onClick={() => handleLike('like')} />
                        )}
                        {post.likes.length} {post.likes.length > 1 ? 'LIKES' : 'LIKE'}
                    </span>
                    <span>{formatDate(post.createdAt)}</span>
                </div>
            </div>

            {/* Admin & Author Action Buttons: Edit & Delete */}

            <div className="absolute top-2 right-2 flex gap-2">
                {/* Edit Button */}
                {user?._id === post.userId && location.pathname.includes('/dashboard/posts') && (
                    <Link
                        to={routesConfig.DASHBOARD_POSTS_EDIT.realPath(post._id)} // This is the path for editing the post
                        className="p-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-600 transition duration-200"
                    >
                        <FaRegEdit size={18} />
                    </Link>
                )}

                {/* Delete Button */}
                {((user?._id === post.userId && location.pathname.includes('/dashboard/posts')) ||
                    (user?.role === 'admin' && location.pathname !== '/dashboard')) && (
                    <button
                        onClick={() => setIsDeletePostModal(true)}
                        className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition duration-200"
                    >
                        <FaRegTrashCan size={18} />
                    </button>
                )}
            </div>

            {/* Delete Post Modal */}
            {isDeletePostModal && <DeletePostModal setIsDeletePostModal={setIsDeletePostModal} post={post} rerenderView={rerenderView} />}
        </div>
    );
}

export default React.memo(PostCard);
