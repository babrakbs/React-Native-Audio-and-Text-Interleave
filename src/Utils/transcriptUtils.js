export const parseTranscript = (jsonData) => {
    const { speakers, pause } = jsonData || {};
    const phrases = [];
    let currentTime = 0;
  
    let maxPhrases = Math.max(
      ...speakers?.map((speaker) => speaker?.phrases?.length)
    );
  
    for (let i = 0; i < maxPhrases; i++) {
      speakers?.forEach((speaker) => {
        if (speaker?.phrases[i]) {
          const phrase = speaker?.phrases[i];
          phrases.push({
            speaker: speaker?.name,
            text: phrase?.words,
            start: currentTime,
            end: currentTime + phrase?.time,
          });
          currentTime += phrase?.time + pause;
        }
      });
    }
  
    return phrases;
  };
  