import { h } from "preact";
import { useMemo } from "preact/hooks";
import { useTooltip } from "@utils/hooks";

/**
 * Представляет собой опции элемента подсказки
 */
export interface IHintProps {
	/**
	 * Перечисление классов для **всплывающей подсказки**
	 */
	className?: string;

	/**
	 * Стиль элемента подсказки
	 */
	style?: string | { [property: string]: string };

	/**
	 * Индивидуальные настройки подсказки
	 */
	hintOptions?: Partial<VK.ITooltipOptions<HTMLSpanElement>>;

	/**
	 * Текст всплывающей подсказки при наведении
	 */
	text: string;
}

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const HINT_TOOLTIP_SHIFT = [22, 10] as const;
const HINT_TOOLTIP_SLIDE = 10;

/**
 * @param props Параметры элемента подсказки
 * @returns Элемент подсказки
 */
export function Hint({ style, className, hintOptions, text }: IHintProps) {
	const tooltipOptions = useMemo(() => ({
		text,
		dir: VK.TooltipDirection.Auto,
		center: true,
		className,
		shift: HINT_TOOLTIP_SHIFT,
		slide: HINT_TOOLTIP_SLIDE,
		...hintOptions,
	}), [className, hintOptions, text]);

	const showTooltip = useTooltip(tooltipOptions);

	return (
		<span
			className="hint_icon"
			style={style}
			onMouseOver={showTooltip}
		/>
	);
}
