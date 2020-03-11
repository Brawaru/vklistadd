import { h, ComponentChild } from "preact";
import { GENERIC_CAMERA_ICON } from "@common/consts";
import { toStyleCombiner } from "@utils/fashion";
import { CLEARFIX, POINTER_LOCKED } from "@common/css";

/**
 * Представляет собой опции блока информации об объекте
 */
export interface IInfoBlockProps {
	/**
	 * Ссылка на аватарку объекта
	 */
	avatarUrl?: string | null;

	/**
	 * Отображаемое название/имя объекта
	 */
	displayName: string;

	/**
	 * Ссылка на объект
	 */
	link: string;

	/**
	 * Элементы информации об объекте
	 */
	infoChildren?: ComponentChild[] | ComponentChild;

	/**
	 * Следует ли отключить действие ссылок
	 */
	disabled?: boolean;
}

const S = toStyleCombiner({
	infoBlock: {
		display: "block",
		marginBottom: "15px",
		lineHeight: "130%",
	},

	leftFloat: {
		float: "left",
	},

	targetInfo: {
		wordWrap: "break-word",
		padding: "2px 0 0 12px",
	},

	targetName: {
		marginBottom: "2px",
	},

	targetAvatar: {
		position: "relative",
		width: "42px",
		height: "42px",
		borderRadius: "100%",
		overflow: "hidden",
		backgroundSize: "cover",
		backgroundPosition: "50%",
	},

	infoText: {
		maxHeight: "48px",
		overflow: "visible",
	},
}, {
	locked: POINTER_LOCKED,
	clearfix: CLEARFIX,
});

const NO_CLICK = (e: MouseEvent) => {
	e.preventDefault();

	return false;
};

/**
 * @param props Свойства блока
 * @returns Блок информации о паблике, группе или пользователе
 */
export function InfoBlock(props: IInfoBlockProps) {
	const { displayName, avatarUrl, link, infoChildren } = props;

	const avatarStyle = {
		backgroundImage: `url("${avatarUrl ?? GENERIC_CAMERA_ICON}")`,
	};

	const disabled = props.disabled ?? false;

	const onClick = disabled ? NO_CLICK : undefined;

	return (
		<div className={S("infoBlock", "clearfix")}>
			<a className={S("leftFloat", "locked", disabled)}
				href={link} onClick={onClick}>
				<div
					className={S("targetAvatar")}
					style={avatarStyle}
				/>
			</a>
			<div className={S("leftFloat", "targetInfo")}>
				<div className={S("targetName")}>
					<a href={link} onClick={onClick}>{displayName}</a>
				</div>
				<div className={S("leftFloat", "infoText")}>
					{infoChildren}
				</div>
			</div>
		</div>
	);
}
