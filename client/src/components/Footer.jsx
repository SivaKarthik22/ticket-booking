import { Button, Flex, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";

function Footer(){
    const {user} = useSelector(store=> store.user);
    const navigate = useNavigate();

    return(
        <Layout.Footer className="footer dark-grey-bg" >
            <div className="footer-container">
                {!user && (
                    <Flex className="width-full" justify="space-between">
                        <Flex gap="middle" align="center">
                            <p>List your shows on My Day My Show:</p>
                            <Button onClick={()=>{navigate('/register/partner')}}>
                                Become a Partner
                            </Button>
                        </Flex>
                        <Flex gap="middle" align="center">
                            <p>Are you looking for Admin page?</p>
                            <Button onClick={()=>{navigate('/login/admin')}}>
                                Admin Login
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </div>
        </Layout.Footer>
    );
}

export default Footer;