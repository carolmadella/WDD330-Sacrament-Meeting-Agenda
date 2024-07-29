document.addEventListener("DOMContentLoaded", async () => {
  const agendaDetails = document.getElementById("agenda-details");

  try {
    const latestMeeting = await fetchLatestMeeting();
    agendaDetails.innerHTML = `
          <h3>Welcome: ${latestMeeting.bishop}</h3>
          <p>Presiding: ${latestMeeting.bishop}</p>
          <p>Conducting: ${latestMeeting.conductor}</p>
          <p>Special Visitors:</p>
          <h4>Announcements</h4>
          <p>${latestMeeting.announcements}</p>
          <h4>Opening Hymn: ${getHymnName(latestMeeting.openingHymn)}</h4>
          <p>Invocation: ${latestMeeting.openingPrayer}</p>
          <h4>Speakers</h4>
          <p>1. ${latestMeeting.speaker1} - ${latestMeeting.speaker1Theme}</p>
          <p>2. ${latestMeeting.speaker2} - ${latestMeeting.speaker2Theme}</p>
          <p>3. ${latestMeeting.speaker3} - ${latestMeeting.speaker3Theme}</p>
          <h4>Closing Hymn: ${getHymnName(latestMeeting.closingHymn)}</h4>
          <p>Benediction: ${latestMeeting.closingPrayer}</p>
        `;
  } catch (error) {
    console.error("Error fetching the latest meeting:", error);
  }
});

function getHymnName(hymnNumber) {
  const hymns = {
    1: "The Morning Breaks",
    2: "Come, Rejoice",
    3: "Now Let Us Rejoice",
    4: "High on the Mountain Top",
  };
  return hymns[hymnNumber] || "Unknown Hymn";
}
