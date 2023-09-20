
const NewsItem = (props) => {

    let { title, description, thumbnail, newsUrl } = props;
    return (
        <>
            <div>
                <div className="card card-shadow h-auto rounded-md bg-white">
                    <div className='h-2/4 rounded-t-md overflow-hidden'>
                        <img src={thumbnail} className='h-full w-full' alt="" />
                    </div>
                    <div className="card-body p-4 flex flex-col gap-y-4">
                        <h5 className='text-2xl font-rubik-medium text-[#444444]'>{title ? title.slice(0, 50) : ""}...</h5>
                        <p className='text-[#444444]'>{description ? description.slice(0, 100) : ""}...</p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className='custom-link-button'>Read More</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsItem;
