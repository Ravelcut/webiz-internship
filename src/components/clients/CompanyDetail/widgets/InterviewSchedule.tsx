// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './InterviewSchedule.css';

const dashboardInterviews = [
  { id: 1, title: 'Interview Meeting', job: 'Product Designer', date: '24 April, 2026', time: '16:00 - 17:00', status: 'Scheduled', statusColor: '#08AC16', attendee: 'Amanda Gray' },
  { id: 2, title: 'Resume Review', job: 'Software Engineer', date: '25 April, 2026', time: '14:00 - 14:30', status: 'Pending', statusColor: '#F19100', attendees: ['Alex Mercer', 'Devon Lane'] },
  { id: 3, title: 'Technical Discussion', job: 'DevOps Lead', date: '26 April, 2026', time: '11:00 - 12:00', status: 'Scheduled', statusColor: '#08AC16', attendee: 'Casey Jones' },
];

const InterviewSchedule = () => {
  return (
    <div className="interview-schedule glass">
      <div className="schedule-left">
        <div className="calendar-mini-header">
          <div className="month-selector">
            <Icon icon="solar:calendar-linear" className="cal-icon" />
            <span>December 2025</span>
          </div>
          <button className="year-val-btn">
            2022 Jun <Icon icon="solar:alt-arrow-down-linear" />
          </button>
        </div>

        <div className="mini-calendar-grid">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
            <div key={day} className="cal-day-label">{day}</div>
          ))}
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const isToday = day === 11;
            const hasEvent = [2, 3, 4, 6, 9, 10, 12, 13, 16, 18, 20, 26, 27].includes(day);
            const isGray = day < 2 || day > 31; // Simplified
            
            return (
              <div key={day} className={`cal-cell ${isToday ? 'today' : ''} ${isGray ? 'gray' : ''}`}>
                <span className="day-num">{day}</span>
                {hasEvent && <div className="event-dot" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="schedule-right">
        <div className="timeline-header">
          <span className="current-date-title">29 Apr, 2024</span>
          <button className="today-btn">Today</button>
        </div>

        <div className="timeline-items">
          {dashboardInterviews.map((meeting, index) => (
            <div key={meeting.id} className="timeline-item">
              <div className="timeline-content">
                <div className="meeting-header">
                  <div className="meeting-titles">
                    <span className="meeting-name">{meeting.title}</span>
                    <span className="meeting-name">{meeting.title}</span>
                  </div>
                  <div className="status-badge" style={{ background: `${meeting.statusColor}15`, color: meeting.statusColor }}>
                    {meeting.status}
                  </div>
                </div>
                
                <div className="meeting-meta">
                   {meeting.attendee ? (
                     <div className="attendee-info">
                       <img src={`https://i.pravatar.cc/150?u=${index}`} alt="" className="tiny-avatar" />
                       <span>{meeting.attendee}</span>
                     </div>
                   ) : (
                     <div className="attendee-stack">
                        <img src="https://i.pravatar.cc/150?u=5" alt="" />
                        <img src="https://i.pravatar.cc/150?u=6" alt="" />
                        <img src="https://i.pravatar.cc/150?u=7" alt="" />
                     </div>
                   )}
                </div>

                <div className="meeting-footer">
                   <span className="job-role">{meeting.job}</span>
                   <span className="dot-separator"></span>
                   <span className="meeting-time">{meeting.date} · {meeting.time}</span>
                </div>
              </div>
              {index < dashboardInterviews.length - 1 && <div className="timeline-connector"></div>}
            </div>
          ))}
        </div>

        <button className="find-similar-btn">
          <Icon icon="solar:magnifer-linear" />
          <span>Find similar</span>
        </button>
      </div>
    </div>
  );
};

export default InterviewSchedule;
