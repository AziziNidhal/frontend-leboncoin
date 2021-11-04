import classes from './SidebarHeader.module.css';
import CardHeader from './../../../UI/Card/CardHeader/CardHeader';

const SidebarHeader = ({classNames,children}) => {
  return (
      <CardHeader classNames={classNames}>
        {children}
      </CardHeader>

  );
};

export default SidebarHeader;
