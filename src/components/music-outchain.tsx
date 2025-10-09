'use client';
function MusicOutchain() {
  return (
    <div className="fixed bottom-0 right-[-200px] z-50">
      <iframe
        width="100%"
        height="350"
        src="//music.163.com/outchain/player?type=0&id=4992498533&auto=1&height=430"
      ></iframe>
    </div>
  );
}

export default MusicOutchain;