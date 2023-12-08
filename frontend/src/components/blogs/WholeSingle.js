import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload';
import Linkify from 'react-linkify';
const WholeSingle = ({ slug, onTitleUpdate }) => {
    const [whole, setWhole] = useState({})
    const [loading, setLoading] = useState(true)

    // const { id } = useParams();
    const getWholeSingleBlog = async () => {
        try {
            await axios.get(`https://mern-backend-pi.vercel.app/api/blog/getoneblog/${slug}`).then((data) => {
                setLoading(true)
                setWhole(data.data.blog)
                onTitleUpdate(data.data.blog.title)
                setLoading(false)


            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })
        } catch (error) {
            console.log(error)

        }
    }

    const linkifyDecorator = (href, text, key) => (
        <a href={href} target="_blank" rel="noopener noreferrer" key={key}>
            {text}
        </a>
    );

    useEffect(() => {
        getWholeSingleBlog()
    }, [slug])
    return (
        <>
            {loading && <h2 className='wholeSingleBlogLoadingH2'>LOADING...</h2>}

            {!loading && <h2 className='wholeSingleBlogHeading'>BLOG DETAILS</h2>}
            <div className='wholeContainer'>
                {
                    !loading && whole && <>
                        <div className='wholeContainerCh'>

                            {whole.image && <>
                                {/* <div className='overlay'></div> */}
                                <LazyLoad height={420} once>
                                    <img src={whole.image} alt='Blog_post_image' />
                                </LazyLoad>
                            </>}
                            <h2>{whole.title}</h2>
                            <p style={{ whiteSpace: "pre-line" }}><Linkify componentDecorator={linkifyDecorator}>{whole.description}</Linkify></p>
                            {
                                whole.image2 && <>
                                    <LazyLoad height={420} once>
                                        <img src={whole.image2} alt='Blog_post_image' />
                                    </LazyLoad>
                                </>
                            }
                            {
                                whole.description2 && <>
                                    <p style={{ whiteSpace: "pre-line" }}><Linkify componentDecorator={linkifyDecorator}>{whole.description2}</Linkify></p>

                                </>
                            }
                            {
                                whole.image3 && <>
                                    <LazyLoad height={420} once>
                                        <img src={whole.image3} alt='Blog_post_image' />
                                    </LazyLoad>
                                </>
                            }
                            {
                                whole.description3 && <>
                                    <p style={{ whiteSpace: "pre-line" }}><Linkify componentDecorator={linkifyDecorator}>{whole.description3}</Linkify></p>

                                </>
                            }
                            <p className='catPara wholeCatPara'>   Category : <span className='catSpan'> {whole.category}</span>  </p>

                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default React.memo(WholeSingle);