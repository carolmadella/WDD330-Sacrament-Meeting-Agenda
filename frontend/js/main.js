document.addEventListener("DOMContentLoaded", () => {
  const agendaList = document.getElementById("agenda-list");
  const agendaForm = document.getElementById("agenda-form");
  const addAgendaBtn = document.getElementById("add-agenda-btn");
  const viewLatestAgendaBtn = document.getElementById("view-latest-agenda-btn");
  let currentAgendaId = null;

  addAgendaBtn.addEventListener("click", () => {
    clearForm();
    agendaForm.classList.toggle("d-none");
  });

  viewLatestAgendaBtn.addEventListener("click", () => {
    window.location.href = "/view";
  });

  agendaForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const meetingData = {
      date: document.getElementById("meetingDate").value,
      presiding: document.getElementById("presiding").value,
      conductor: document.getElementById("conductor").value,
      chorister: document.getElementById("chorister").value,
      accompanist: document.getElementById("accompanist").value,
      openingHymn: document.getElementById("openingHymn").value,
      openingPrayer: document.getElementById("openingPrayer").value,
      announcements: document.getElementById("announcements").value,
      speaker1: document.getElementById("speaker1").value,
      speaker1Theme: document.getElementById("speaker1Theme").value,
      speaker2: document.getElementById("speaker2").value,
      speaker2Theme: document.getElementById("speaker2Theme").value,
      speaker3: document.getElementById("speaker3").value,
      speaker3Theme: document.getElementById("speaker3Theme").value,
      closingHymn: document.getElementById("closingHymn").value,
      closingPrayer: document.getElementById("closingPrayer").value,
    };
    try {
      if (currentAgendaId) {
        await updateMeeting(currentAgendaId, meetingData);
      } else {
        await createMeeting(meetingData);
      }
      clearForm();
      loadMeetings();
    } catch (error) {
      console.error("Error saving meeting:", error);
    }
  });

  function clearForm() {
    agendaForm.reset();
    agendaForm.classList.add("d-none");
    addAgendaBtn.classList.remove("d-none");
    document.getElementById("save-agenda-btn").innerText = "Save Agenda";
    currentAgendaId = null;
  }

  async function loadMeetings() {
    try {
      const meetings = await fetchMeetings();
      agendaList.innerHTML = meetings
        .map(
          (meeting) => `
        <div class="card my-2">
          <div class="card-body">
            <h5 class="card-title">Meeting Date: ${meeting.date}</h5>
            <button class="btn btn-primary" onclick="editMeeting('${meeting._id}')">Edit</button>
            <button class="btn btn-danger" onclick="deleteMeeting('${meeting._id}')">Delete</button>
          </div>
        </div>
      `
        )
        .join("");
    } catch (error) {
      console.error("Error loading meetings:", error);
    }
  }

  window.editMeeting = async (id) => {
    try {
      const meeting = await fetchMeeting(id);
      document.getElementById("meetingDate").value = meeting.date;
      document.getElementById("presiding").value = meeting.presiding;
      document.getElementById("conductor").value = meeting.conductor;
      document.getElementById("chorister").value = meeting.chorister;
      document.getElementById("accompanist").value = meeting.accompanist;
      document.getElementById("openingHymn").value = meeting.openingHymn;
      document.getElementById("openingPrayer").value = meeting.openingPrayer;
      document.getElementById("announcements").value = meeting.announcements;
      document.getElementById("speaker1").value = meeting.speaker1;
      document.getElementById("speaker1Theme").value = meeting.speaker1Theme;
      document.getElementById("speaker2").value = meeting.speaker2;
      document.getElementById("speaker2Theme").value = meeting.speaker2Theme;
      document.getElementById("speaker3").value = meeting.speaker3;
      document.getElementById("speaker3Theme").value = meeting.speaker3Theme;
      document.getElementById("closingHymn").value = meeting.closingHymn;
      document.getElementById("closingPrayer").value = meeting.closingPrayer;
      agendaForm.classList.remove("d-none");
      addAgendaBtn.classList.add("d-none");
      document.getElementById("save-agenda-btn").innerText = "Update Agenda";
      currentAgendaId = id;
    } catch (error) {
      console.error("Error editing meeting:", error);
    }
  };

  window.deleteMeeting = async (id) => {
    try {
      await deleteMeetingById(id);
      loadMeetings();
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  loadMeetings();
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
