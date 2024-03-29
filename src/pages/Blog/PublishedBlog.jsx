import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft } from 'lucide-react'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DeletePublication from '../../components/Modals/DeletePublication';
import { useAuth } from '../../context/AuthContext';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useNavigate, useParams } from 'react-router-dom';
import getUserPhoto from '../../utils/getUserPhoto';
import { MessageSquare } from 'lucide-react';
import CommentsDrawer from './CommentsDrawer';
import LikePostButton from '../../components/Buttons/LikePostButton';
import PostMenu from './PostMenu';
import FeaturePost from '../../components/Modals/FeaturePost';
import FeaturedMark from './FeaturedMark';
import PhotoGallery from '../../components/Modals/ShowCard/PhotoGallery';

const PublishedBlogLayout = ({
    id,
    title,
    BlogMultimedia,
    createdAt,
    description,
    currAuthUser,
    User,
    LikesCount = 0,
    CommentsCount = 0,
    navigate,
    featured_blog,
    toggleComments,
    toggleFeaturePost,
    openComments,
    handleDeletePost,
    LikesBlog
}) => (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Box sx={{
            height: 'inherit',
            width: 'inherit',
            overflowY: openComments ? 'hidden' : 'auto'
        }}>
            <Box sx={{
                flex: 1,
                height: 'fit-content',
                width: '100%',
                position: 'relative'
            }}>
                <Box sx={{
                    position: 'absolute',
                    zIndex: 100,
                    bgcolor: 'rgba(0, 0, 0, 0.36)',
                    borderRadius: '100px',
                    left: 20,
                    top: 20
                }}>
                    <IconButton onClick={() => navigate(-1)}>
                        <ChevronLeft color="#fff" />
                    </IconButton>
                </Box>
                {featured_blog && <FeaturedMark top={20} right={20} />}
                <PhotoGallery images={BlogMultimedia.map(item => getUserPhoto(item.name))} />
            </Box>
            <Box sx={{
                borderRadius: '24px 24px 0px 0px',
                display: 'flex',
                flexDirection: 'column',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                position: 'relative'
            }}>
                {(User.email == currAuthUser.email) && (
                    <Box sx={{
                        position: 'absolute',
                        zIndex: 100,
                        bgcolor: 'rgba(0, 0, 0, 0.36)',
                        borderRadius: '100px',
                        right: 20,
                        top: 20
                    }}>
                        <PostMenu
                            item={{ id: id }}
                            handleDeletePost={handleDeletePost}
                            openFeaturePost={toggleFeaturePost}
                        />
                    </Box>
                )}
                <Stack
                    orientation='vertical'
                    spacing={1}
                    sx={{ p: 2 }}
                >
                    <Typography
                        component="div"
                        variant="body2"
                        color="text.tertiary"
                        fontWeight={500}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {format(new Date(createdAt), 'MMMM d, y', { locale: es })}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'start', flex: 1 }}>
                        {User.img_profile && (
                            <Box
                                component="img"
                                alt='blog_post.png'
                                src={getUserPhoto(JSON.parse(User.img_profile)[0])}
                                sx={{
                                    maxWidth: 22,
                                    maxHeight: 22,
                                    borderRadius: 1,
                                    mr: 1
                                }}
                            />
                        )}
                        <Typography
                            component="div"
                            variant="caption"
                            color="text.secondary"
                            fontWeight={500}
                        >
                            {`${User.name} `}
                            {User.lastName && `${User.lastName}`}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h5"
                        color="text.primary"
                        fontWeight={500}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                    >
                        {description}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    spacing={1}
                    p={2}
                    sx={{
                        justifyContent: { xs: 'space-between', sm: 'flex-start' },
                        alignItems: 'center'
                    }}
                >
                    <LikePostButton
                        id={id}
                        type="post"
                        LikesBlog={LikesBlog}
                        LikesCount={LikesCount}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={toggleComments}>
                        <IconButton>
                            <MessageSquare color="#5E5E5E" />
                        </IconButton>
                        <Typography variant="body2" ml={1} color="#5E5E5E">
                            {CommentsCount}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    </Slide>
)

const PublishedBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [featurePost, setFeaturePost] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [blog, setBlog] = React.useState([])
    const [deletePost, setDeletePost] = React.useState(false)
    const { state: { user } } = useAuth()
    const [openComments, setOpenComments] = React.useState(false)
    const [commentsCount, setCommentsCount] = React.useState(0)

    const fetchBlog = async () => {
        setLoading(true)

        try {
            const res = await apiProvider.get(`api/blog/blog/${id}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setBlog(data)
                setCommentsCount(data.commentsCount)
                setLoading(false)
            }
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }

    const toggleFeaturePost = () => setFeaturePost(!featurePost)

    const toggleComments = () => {
        setOpenComments(!openComments)
    }

    const handleDeletePost = async () => {
        setDeletePost(!deletePost);
    }

    useEffectOnce(() => { fetchBlog() }, []);

    if (loading) return <LoadingIndicator />

    return (
        <Box id='comments-drawer-container'>
            {(loading) ? (
                <LoadingIndicator />
            ) : (
                <>
                    <PublishedBlogLayout
                        {...blog}
                        CommentsCount={commentsCount}
                        handleDeletePost={handleDeletePost}
                        currAuthUser={user}
                        navigate={navigate}
                        toggleComments={toggleComments}
                        toggleFeaturePost={toggleFeaturePost}
                    />
                    <DeletePublication
                        open={deletePost}
                        handleClose={handleDeletePost}
                        item={blog}
                    />
                    <CommentsDrawer
                        openComments={openComments}
                        handleClose={toggleComments}
                        item={blog}
                        fetchBlog={fetchBlog}
                        setCommentCount={setCommentsCount}
                    />
                    <FeaturePost
                        open={featurePost}
                        handleClose={toggleFeaturePost}
                        item={blog}
                        redirect={`/blogs/${blog.id}`}
                    />
                </>
            )}
        </Box>
    )
}

export default PublishedBlog
