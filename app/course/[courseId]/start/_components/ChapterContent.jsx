import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from 'react-markdown'
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

const ChapterContent = ({ chapter, content }) => {
  return (
    <div className="p-10">
      <h2 className="font-medium text-2xl ">
        {chapter?.chapterName.split(":")[1]}
      </h2>
      <p className="text-gray-500">{chapter?.about}</p>

      {/* Video */}
      <div className="flex justify-center my-6">
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>

      {/* Content */}
      <div>
        {content?.content?.topics?.map((item, index) => (
          <div key={index} className="p-5 bg-sky-50 mb-3 rounded-lg">
            <h2 className="font-medium text-lg">{item.title}</h2>
            {/* <p className="whitespace-pre-wrap">{item?.explanation}</p> */}
            <ReactMarkdown className="mt-3">{String(item?.explanation)}</ReactMarkdown>


            {item?.code_example && (
              <div className="p-4 bg-black text-white rounded-md mt-3">
                <pre>
                  <code>{item?.code_example.replace(/<\/?precode>/g, '')}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
