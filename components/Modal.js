export default function Modal({show, onClose, children}){
    return(
        <>
            {/* Modal  */}
            <div className='absolute top-0 left-0 w-full h-full z-10 transition-all duration-500' style={{
                transform: show ? 'translateX(0%)' : 'translateX(-200%)'
            }}>
                <div className='container mx-auto mx-w-2xl h-[80vh] rounded-3xl bg-slate-800 py-6 px-4'>
                <button className='w-10 h-10 mb-4 font-bold rounded-full bg-slate-600' onClick={()=> onClose(false)}>X</button>
                {children}
                </div>
            </div>
        </>
    )
}