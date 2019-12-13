import React from 'react';
import { Link } from 'react-router-dom';
import previewStyles from '../styles/ChatPreview.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export function ChatPreview(props) {
	const { chat } = props;
	let lastMes = '';
	let time = '';
	let src = '';
	if (chat.mes && chat.mes.length > 0 ) {
		lastMes = chat.mes[chat.mes.length - 1].message;
		time = chat.mes[chat.mes.length - 1].time;
	}

	if (chat.flag === true) {
		src = 'https://cdn.iconscout.com/icon/premium/png-512-thumb/double-tick-2-571364.png';
	}
	if (chat.flag === false) {
		src =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Google_Material_Design_check.svg/1024px-Google_Material_Design_check.svg.png';
	}

	return (
		<Link style={{textDecoration: 'none',}} to={{ pathname: '/chat/', search: `?chatId=${props.chat_id}`, }}>
			<div className={previewStyles.chat_pre} /* onClick={() => props.rerender()} */>
				<div className={previewStyles.foto}>
					<img className={previewStyles.user_foto} alt="" src={chat.url} />
				</div>
				<div className={previewStyles.pers_info}>
					<div className={previewStyles.user_info}>
						<div className={previewStyles.Name}>
							<span className={previewStyles.usr_name}>{chat.name}</span>
						</div>
						<div className={previewStyles.last_mes}>
							<div className={previewStyles.last_ms}>{lastMes}</div>
						</div>
					</div>
					<div className={previewStyles.time_check}>
						<div className={previewStyles.Time}>
							<span className={previewStyles.time}>{time}</span>
						</div>
						<div className={previewStyles.indicate}>
							<div className={previewStyles.indicate_img}>
								<img className={previewStyles.indicator} src={src} alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}