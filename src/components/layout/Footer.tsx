import Image from 'next/image';
import Link from 'next/link';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useBgColor } from '@/hooks/commonhook';
import { pagesPath } from '@/utils/$path';

const Footer = () => {
  const bgColors = useBgColor();
  const community = useCommunityState();

  return (
    <div>
      <header className='h-12 bg-staywatch-header text-center shadow-md'>
        <div className='pt-1'>
          <Link href={pagesPath.$url()} passHref>
            <Image src="/logo.png" width={136} height={39} alt='logo'/>
          </Link>
        </div>
      </header>
      <p className='mr-8 text-right text-xl text-gray-400'>{community.communityName}</p>
      <div className='fixed bottom-0 w-full'>
        <div className='flex h-16 items-center justify-evenly bg-staywatch-header text-white'>
          <Link href='/'>
            <a>
              {/* <div className="flex flex-col items-center gap-1 px-2 py-1 rounded"> */}
              <div
                className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.stayer}`}
              >
                <Image src='/homeWhite.png' alt='stayer' width={20} height={20} />
                <div>滞在者</div>
              </div>
            </a>
          </Link>
          <Link href={pagesPath.roomHistory.$url()}>
            <a>
              <div
                className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.roomHistory} text-staywatch-button`}
              >
                <Image src='/historyWhite.png' alt='history' width={20} height={20} />
                <div>滞在履歴</div>
              </div>
            </a>
          </Link>
          <Link href={pagesPath.userInformation.$url()}>
            <a>
              <div
                className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.userInformation} text-staywatch-button`}
              >
                <Image src='/userInfoWhite.png' alt='userInfo' width={15} height={20} />
                <div>利用者情報</div>
              </div>
            </a>
          </Link>
          <Link href={pagesPath.floorMap.$url()}>
            <a>
              <div
                className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.floorMap} text-staywatch-button`}
              >
                <Image src='/mapWhite.png' alt='map' width={20} height={20} />
                <div>滞在者マップ</div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
