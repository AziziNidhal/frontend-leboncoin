import CreateAccountForm from './../../../components/auth/CreateAccount/CreateAccountForm';
import { useRouter } from 'next/router';
const Signup = () => {
    const router = useRouter();
    return <CreateAccountForm params={router.query.slug}/>
}

export default Signup;