import Header from './Header';
import Body from './Body';
import QrCode from './QRCode';
import Footer from './Footer';
import './Style/style.css';

const InitPage = () => {
	return (
		<div className='renderInit-r'>
			<Header />
			<Body />
			<QrCode />
			<Footer />
		</div>
	);
};

export default InitPage;
