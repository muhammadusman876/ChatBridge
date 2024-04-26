import Message from "./Message";

const Messages = () => {
	return (
		//so that content can have a scroll bar with OVERFLOW-AUTO
		<div className='px-4 flex-1 overflow-auto'>
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
		</div>
	);
};
export default Messages;