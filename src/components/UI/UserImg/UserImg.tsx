import getFullImagePath from "../../../utilities/getFullImagePath";
import classes from "./UserImg.module.css";

const UserImg = ({imageUrl}) => {
  return (
    <img src={getFullImagePath(imageUrl)} className={classes['user-img']} alt="" />
  );
};
export default UserImg;
