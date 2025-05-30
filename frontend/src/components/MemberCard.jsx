import { useEffect, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { BsBinoculars, BsEye, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberInfo } from '../services/memberService';
import { showLoader } from '../store/loaderSlice';
import { setMemberInfo } from '../store/memberSlice';
import { motion } from 'framer-motion';
import DeleteMemberModal from './DeleteMemberModal';
import useLockScroll from '../utils/useLockScroll';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';

function MemberCard({ member, user, rerenderView }) {
    const dispatch = useDispatch();
    const [isDeleteMemberModal, setIsDeleteMemberModal] = useState(false);
    useLockScroll(isDeleteMemberModal);

    const handleMemberInfo = async () => {
        dispatch(showLoader(true));
        const res = await getMemberInfo(member._id);
        dispatch(showLoader(false));
        if (res.status === 'success') dispatch(setMemberInfo(res.member));
    };

    return (
        <div className="box flex flex-col md:flex-row items-center justify-between overflow-y-hidden">
            <div className="flex flex-col md:flex-row items-center gap-[20px]">
                <img src={member.image} alt="avatar" className="w-[70px] h-[70px] object-cover rounded-full border" />
                <div>
                    <h5 className="text-lg font-semibold text-center md:text-start">{member.firstName + ' ' + member.lastName}</h5>
                    {user.role === 'admin' && (
                        <>
                            <p>
                                <span className="font-semibold">Gender:</span> {member.gender}
                            </p>
                            <p className="break-words">
                                <span className="font-semibold">Email:</span> {member.email}
                            </p>
                        </>
                    )}
                </div>
            </div>
            {user.role === 'admin' && (
                <div className="">
                    <p className="">
                        <span className="font-semibold">Role:</span> {member.role}
                    </p>
                </div>
            )}
            {user.role === 'admin' && (
                <div>
                    <p>
                        <span className="font-semibold">Birth date:</span> {formatDate(member.birthDate)}
                    </p>
                    <p>
                        <span className="font-semibold">Member from:</span> {formatDate(member.createdAt)}
                    </p>
                </div>
            )}
            <div className="flex md:flex-col gap-[10px]">
                <Link
                    to={routesConfig.POST_AUTHOR.realPath(member._id)}
                    className="w-[30px] h-[30px] bg-teal-500 rounded-md flex items-center justify-center"
                >
                    <BsBinoculars />
                </Link>
                <button className="w-[30px] h-[30px] border border-mainBlue rounded-md flex items-center justify-center text-mainBlue">
                    <IoChatboxEllipsesOutline />
                </button>
                {user.role === 'admin' && (
                    <button
                        className="w-[30px] h-[30px] bg-green-700 rounded-md flex items-center justify-center text-white"
                        onClick={handleMemberInfo}
                    >
                        <BsEye />
                    </button>
                )}
                {user.role === 'admin' && (
                    <button
                        onClick={() => setIsDeleteMemberModal(true)}
                        className="w-[30px] h-[30px] bg-red-700 rounded-md flex items-center justify-center text-white"
                    >
                        <BsTrash />
                    </button>
                )}
                {isDeleteMemberModal && (
                    <DeleteMemberModal setIsDeleteMemberModal={setIsDeleteMemberModal} member={member} rerenderView={rerenderView} />
                )}
            </div>
        </div>
    );
}

export default MemberCard;
