import { GetServerSideProps } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { File } from 'lucide-react';

import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/banner';
import { Separator } from '@/components/ui/separator';

import { VideoPlayer } from './_components/video-player';
import { CourseEnrollButton } from './_components/course-enroll-button';
import { CourseProgressButton } from './_components/course-progress-button';
import Preview from '@/components/preview';

type ChapterIdPageProps = {
  chapter: any;
  course: any;
  muxData: any;
  attachments: any[];
  nextChapter: any;
  userProgress: any;
  purchase: any;
  params: { courseId: string; chapterId: string };
};

const ChapterIdPage = ({
  chapter,
  course,
  muxData,
  attachments,
  nextChapter,
  userProgress,
  purchase,
  params,
}: ChapterIdPageProps) => {
  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { userId } = await auth();

  if (!userId) {
    return { redirect: { destination: '/', permanent: false } };
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } =
  await getChapter({
    userId,
    chapterId: Array.isArray(params?.chapterId) ? params.chapterId[0] : params?.chapterId!,
    courseId: Array.isArray(params?.courseId) ? params.courseId[0] : params?.courseId!,
  });


  if (!chapter || !course) {
    return { redirect: { destination: '/', permanent: false } };
  }

  return {
    props: {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
      params,
    },
  };
};

export default ChapterIdPage;
