namespace devil
{
    /**
	 * @author        devil
	 * @version       V201190215
	 * @create        2019-02-15
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
     */
    export class ButtonSelectedBase implements IPool
    {
        private _button:ButtonImage;

        public set button(value:ButtonImage)
        {
            this._button = value;
        }

        public set selected(value:boolean)
        {
            if(this._button.buttonState != ButtonState.DISANABLED)
            {
                if(this._button.buttonState != ButtonState.SELECTED && value)this._button.buttonState = ButtonState.SELECTED;
                else if(this._button.buttonState == ButtonState.SELECTED && !value)this._button.buttonState = ButtonState.UP;
            }
        }

        public get selected()
        {
            return this._button.buttonState == ButtonState.SELECTED;
        }

        public reuse():void
        {

        }

        public unuse():void
        {
            this._button = null;
        }

        public dispose():void
        {
            this._button = null;
        }

        public pool():void
        {
            Manager.pool.push(this);
        }
    }
}