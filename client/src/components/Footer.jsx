import { Button, Flex, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";

import '../styles/component-styles.css'

function Footer(){
    const {user} = useSelector(store=> store.user);
    const navigate = useNavigate();

    return(
        <Layout.Footer className="footer dark-grey-bg" >
            <div className="footer-container">
                {!user && (
                    <Flex gap="middle" align="center">
                        <p>List your shows on My Day My Show:</p>
                        <Button onClick={()=>{navigate('/register/partner')}}>
                            Become a Partner
                        </Button>
                    </Flex>
                )}
            </div>
        </Layout.Footer>
    );
}

export default Footer;