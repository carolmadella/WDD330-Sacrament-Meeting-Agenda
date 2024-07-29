const API_BASE_URL = "https://wdd330-sacrament-meeting-agenda.onrender.com";
// const API_BASE_URL = "http://localhost:3000";

// Fetch all meetings
async function fetchMeetings() {
  const response = await fetch(`${API_BASE_URL}/meetings/`);
  if (!response.ok) {
    throw new Error("Failed to fetch meetings");
  }
  return await response.json();
}

// Fetch a single meeting by ID
async function fetchMeeting(id) {
  const response = await fetch(`${API_BASE_URL}/meetings/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch meeting");
  }
  return await response.json();
}

// Create a new meeting
async function createMeeting(meeting) {
  const response = await fetch(`${API_BASE_URL}/meetings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meeting),
  });
  if (!response.ok) {
    throw new Error("Failed to create meeting");
  }
  return await response.json();
}

// Update a meeting
async function updateMeeting(id, meeting) {
  const response = await fetch(`${API_BASE_URL}/meetings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meeting),
  });
  if (!response.ok) {
    throw new Error("Failed to update meeting");
  }
  if (response.status === 204) {
    return {}; // No content response
  }
  return await response.json();
}

// Delete a meeting
async function deleteMeetingById(id) {
  const response = await fetch(`${API_BASE_URL}/meetings/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete meeting");
  }
}

// Fetch the latest meeting
async function fetchLatestMeeting() {
  const response = await fetch(`${API_BASE_URL}/meetings/latest`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest meeting");
  }
  return await response.json();
}
