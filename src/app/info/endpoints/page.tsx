"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  role: string;
  category: 'Auth' | 'Comments' | 'Company' | 'Talent' | 'Recruiter' | 'Health';
  description: string;
}

const endpointsData: Endpoint[] = [
  // --- Auth ---
  {
    method: 'POST',
    path: '/api/Auth/login',
    role: 'საჯარო / ანონიმური (Anonymous)',
    category: 'Auth',
    description: 'ახდენს კომპანიის მომხმარებლის ავტორიზაციას ელფოსტისა და პაროლის საშუალებით. წარმატებული ავტორიზაციის შემთხვევაში, სისტემაში შესვლა ხდება უსაფრთხო cookies (Cookie-based auth) საშუალებით და ბრუნდება ავტორიზებული კომპანიის ID.'
  },
  {
    method: 'POST',
    path: '/api/Auth/login/talent',
    role: 'საჯარო / ანონიმური (Anonymous)',
    category: 'Auth',
    description: 'ახდენს ტალანტის (კანდიდატის) მომხმარებლის ავტორიზაციას. წარმატებული ავტორიზაციის შემთხვევაში, მომხმარებელი შედის სისტემაში ქუქიების მეშვეობით და ბრუნდება ტალანტის ID.'
  },
  {
    method: 'POST',
    path: '/api/Auth/login/recruiter',
    role: 'საჯარო / ანონიმური (Anonymous)',
    category: 'Auth',
    description: 'ახდენს რეკრუტერის მომხმარებლის ავტორიზაციას. წარმატებული ავტორიზაციის შემთხვევაში, მომხმარებელი შედის სისტემაში ქუქიების მეშვეობით და ბრუნდება რეკრუტერის ID.'
  },
  {
    method: 'POST',
    path: '/api/Auth/logout',
    role: 'ავტორიზებული მომხმარებელი (ნებისმიერი როლი)',
    category: 'Auth',
    description: 'ახდენს მომხმარებლის სისტემიდან გამოსვლას (Log out) აქტიური სესიის ქუქიების წაშლის გზით.'
  },

  // --- Comments ---
  {
    method: 'GET',
    path: '/api/Comments/assignment/{assignmentId}',
    role: 'ავტორიზებული (კომპანია, ტალანტი, ან რეკრუტერი) - აუცილებელია წვდომა დავალებაზე',
    category: 'Comments',
    description: 'აბრუნებს კონკრეტულ დავალებაზე დაწერილ ყველა კომენტარს ქრონოლოგიური თანმიმდევრობით.'
  },
  {
    method: 'POST',
    path: '/api/Comments',
    role: 'ავტორიზებული (კომპანია, ტალანტი, ან რეკრუტერი) - აუცილებელია წვდომა დავალებაზე',
    category: 'Comments',
    description: 'წერს ახალ კომენტარს კონკრეტულ დავალებაზე. კომენტარის ავტორის მონაცემები ავტომატურად განისაზღვრება აქტიური სესიის მიხედვით.'
  },

  // --- Company Profile ---
  {
    method: 'GET',
    path: '/api/Company/profile',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს ავტორიზებული კომპანიის პროფილის მონაცემებს.'
  },
  {
    method: 'PUT',
    path: '/api/Company/profile',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'ანახლებს კომპანიის პროფილის მონაცემებს (სახელი, ინდუსტრია, დეტალები).'
  },
  {
    method: 'DELETE',
    path: '/api/Company/profile',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'შლის ავტორიზებული კომპანიის პროფილს და აუქმებს ანგარიშს.'
  },

  // --- Company Recruiters ---
  {
    method: 'GET',
    path: '/api/Company/recruiters',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს კომპანიასთან ასოცირებული (დასაქმებული) ყველა რეკრუტერის სიას.'
  },
  {
    method: 'POST',
    path: '/api/Company/recruiters/invite/{recruiterId}',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'უგზავნის თანამშრომლობის მოწვევას სისტემაში დარეგისტრირებულ კონკრეტულ რეკრუტერს.'
  },
  {
    method: 'DELETE',
    path: '/api/Company/recruiters/invitations/{invitationId}',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აუქმებს (უკან იწვევს) რეკრუტერისთვის გაგზავნილ აქტიურ მოწვევას.'
  },
  {
    method: 'DELETE',
    path: '/api/Company/recruiters/{recruiterId}',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აუქმებს რეკრუტერის ასოცირებას (აშორებს რეკრუტერს) კომპანიიდან.'
  },
  {
    method: 'GET',
    path: '/api/Company/recruiters/invitations',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს კომპანიის მიერ გაგზავნილი რეკრუტერების ყველა მოწვევის სიას.'
  },

  // --- Company Talents ---
  {
    method: 'GET',
    path: '/api/Company/talents',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს კომპანიასთან ასოცირებული (მოწვეული/დასაქმებული) ყველა ტალანტის სიას.'
  },
  {
    method: 'GET',
    path: '/api/Company/talents/all',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს სისტემაში დარეგისტრირებული ყველა ტალანტის (კანდიდატის) სიას, მათი მოძიებისა და დასაქმების მიზნით.'
  },
  {
    method: 'POST',
    path: '/api/Company/talents/invite/{talentId}',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'უგზავნის სამუშაო მოწვევას კონკრეტულ ტალანტს.'
  },
  {
    method: 'DELETE',
    path: '/api/Company/talents/{talentId}',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აშორებს/ათავისუფლებს ტალანტს კომპანიიდან.'
  },
  {
    method: 'DELETE',
    path: '/api/Company/talents/invitations/{invitationId}',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აუქმებს (უკან იწვევს) ტალანტისთვის გაგზავნილ აქტიურ მოწვევას.'
  },
  {
    method: 'GET',
    path: '/api/Company/talents/invitations',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს კომპანიის მიერ ტალანტებისთვის გაგზავნილი მოწვევების სიას.'
  },
  {
    method: 'GET',
    path: '/api/Company/employees',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს კომპანიის აქტიური თანამშრომლების სიას (ტალანტები, რომლებმაც მიიღეს მოწვევა და დასაქმდნენ).'
  },

  // --- Company Assignments ---
  {
    method: 'GET',
    path: '/api/Company/assignments',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს კომპანიის მიერ შექმნილი ყველა დავალების/ტოდოს სიას.'
  },
  {
    method: 'POST',
    path: '/api/Company/assignments',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'ქმნის ახალ დავალებას და ანიჭებს მას კონკრეტულ ტალანტს.'
  },
  {
    method: 'PUT',
    path: '/api/Company/assignments',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'ანახლებს არსებული დავალების დეტალებს (სათაური, აღწერა, ბოლო ვადა).'
  },
  {
    method: 'DELETE',
    path: '/api/Company/assignments/{assignmentId}',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'შლის კონკრეტულ დავალებას.'
  },

  // --- Company Jobs ---
  {
    method: 'GET',
    path: '/api/Company/jobs',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს კომპანიის მიერ გამოქვეყნებული ყველა ვაკანსიის სიას.'
  },
  {
    method: 'POST',
    path: '/api/Company/jobs',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'ქმნის და აქვეყნებს ახალ ვაკანსიას.'
  },
  {
    method: 'PUT',
    path: '/api/Company/jobs',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'ანახლებს არსებული ვაკანსიის დეტალებს.'
  },
  {
    method: 'DELETE',
    path: '/api/Company/jobs/{jobId}',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'შლის კონკრეტულ ვაკანსიას.'
  },

  // --- Company Join Requests ---
  {
    method: 'GET',
    path: '/api/Company/talent-join-requests',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს ტალანტებისგან შემოსულ კომპანიაში გაწევრიანების მოთხოვნებს.'
  },
  {
    method: 'POST',
    path: '/api/Company/talent-join-requests/{joinRequestId}/approve',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'ამტკიცებს ტალანტის მოთხოვნას და ამატებს მას კომპანიის წევრად.'
  },
  {
    method: 'POST',
    path: '/api/Company/talent-join-requests/{joinRequestId}/reject',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'უარყოფს ტალანტის მოთხოვნას.'
  },
  {
    method: 'GET',
    path: '/api/Company/recruiter-join-requests',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'აბრუნებს რეკრუტერებისგან შემოსულ კომპანიაში გაწევრიანების მოთხოვნებს.'
  },
  {
    method: 'POST',
    path: '/api/Company/recruiter-join-requests/{joinRequestId}/approve',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'ამტკიცებს რეკრუტერის მოთხოვნას და ამატებს მას კომპანიის რეკრუტერად.'
  },
  {
    method: 'POST',
    path: '/api/Company/recruiter-join-requests/{joinRequestId}/reject',
    role: 'კომპანია (Company)',
    category: 'Company',
    description: 'უარყოფს რეკრუტერის მოთხოვნას.'
  },

  // --- Talent Profile ---
  {
    method: 'GET',
    path: '/api/Talent/profile',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'აბრუნებს ავტორიზებული ტალანტის პროფილის მონაცემებს.'
  },
  {
    method: 'PUT',
    path: '/api/Talent/profile',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'ანახლებს ტალანტის პროფილის მონაცემებს (სახელი, უნარები, ბიოგრაფია, კონტაქტი).'
  },
  {
    method: 'DELETE',
    path: '/api/Talent/profile',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'შლის ტალანტის ანგარიშს და პროფილს.'
  },

  // --- Talent Companies & Jobs ---
  {
    method: 'GET',
    path: '/api/Talent/companies',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'აბრუნებს კომპანიების სიას, რომლებთანაც ეს ტალანტი ამჟამად არის ასოცირებული.'
  },
  {
    method: 'GET',
    path: '/api/Talent/companies/all',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'აბრუნებს სისტემაში დარეგისტრირებული ყველა კომპანიის სიას.'
  },
  {
    method: 'GET',
    path: '/api/Talent/jobs/all',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'აბრუნებს პლატფორმაზე არსებულ ყველა აქტიურ ვაკანსიას.'
  },

  // --- Talent Invitations ---
  {
    method: 'GET',
    path: '/api/Talent/invitations',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'აბრუნებს კომპანიებისგან მიღებულ ყველა აქტიურ სამუშაო მოწვევას.'
  },
  {
    method: 'POST',
    path: '/api/Talent/invitations/{invitationId}/accept',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'იღებს კომპანიის მოწვევას და ხდება ამ კომპანიის თანამშრომელი.'
  },
  {
    method: 'POST',
    path: '/api/Talent/invitations/{invitationId}/reject',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'უარყოფს კომპანიისგან მიღებულ მოწვევას.'
  },

  // --- Talent Join Requests ---
  {
    method: 'GET',
    path: '/api/Talent/join-requests',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'აბრუნებს ტალანტის მიერ კომპანიებში გაგზავნილ გაწევრიანების აქტიურ მოთხოვნებს.'
  },
  {
    method: 'POST',
    path: '/api/Talent/join-requests/{companyId}',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'უგზავნის კომპანიას გაწევრიანების/თანამშრომლობის მოთხოვნას.'
  },
  {
    method: 'DELETE',
    path: '/api/Talent/join-requests/{joinRequestId}',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'აუქმებს გაგზავნილ გაწევრიანების მოთხოვნას.'
  },

  // --- Talent Assignments ---
  {
    method: 'GET',
    path: '/api/Talent/assignments',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'აბრუნებს კომპანიების მიერ ამ ტალანტისთვის მინიჭებულ ყველა დავალებას/ტოდოს.'
  },
  {
    method: 'PUT',
    path: '/api/Talent/assignments/state',
    role: 'ტალანტი (Talent)',
    category: 'Talent',
    description: 'ანახლებს დავალების სტატუსს (მაგალითად, გადაჰყავს სტატუსში: "მიმდინარე" ან "დასრულებული").'
  },

  // --- Recruiter Profile ---
  {
    method: 'GET',
    path: '/api/Recruiter/profile',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'აბრუნებს ავტორიზებული რეკრუტერის პროფილის მონაცემებს.'
  },
  {
    method: 'PUT',
    path: '/api/Recruiter/profile',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'ანახლებს რეკრუტერის პროფილის მონაცემებს (სახელი, გვარი, გამოცდილება, კონტაქტი).'
  },
  {
    method: 'DELETE',
    path: '/api/Recruiter/profile',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'შლის რეკრუტერის ანგარიშს და პროფილს.'
  },

  // --- Recruiter Companies & Jobs ---
  {
    method: 'GET',
    path: '/api/Recruiter/companies',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'აბრუნებს იმ კომპანიების სიას, რომლებთანაც ეს რეკრუტერი ამჟამად არის ასოცირებული.'
  },
  {
    method: 'GET',
    path: '/api/Recruiter/companies/all',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'აბრუნებს სისტემაში დარეგისტრირებული ყველა კომპანიის სიას.'
  },
  {
    method: 'GET',
    path: '/api/Recruiter/jobs/all',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'აბრუნებს მასთან ასოცირებული კომპანიების ყველა აქტიურ ვაკანსიას.'
  },

  // --- Recruiter Invitations ---
  {
    method: 'GET',
    path: '/api/Recruiter/invitations',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'აბრუნებს კომპანიებისგან მიღებულ ყველა აქტიურ მოწვევას.'
  },
  {
    method: 'POST',
    path: '/api/Recruiter/invitations/{invitationId}/accept',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'იღებს კომპანიის მოწვევას და ხდება მისი ასოცირებული რეკრუტერი.'
  },
  {
    method: 'POST',
    path: '/api/Recruiter/invitations/{invitationId}/reject',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'უარყოფს კომპანიისგან მიღებულ მოწვევას.'
  },

  // --- Recruiter Join Requests ---
  {
    method: 'GET',
    path: '/api/Recruiter/join-requests',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'აბრუნებს რეკრუტერის მიერ კომპანიებში გაგზავნილ გაწევრიანების მოთხოვნებს.'
  },
  {
    method: 'POST',
    path: '/api/Recruiter/join-requests/{companyId}',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'უგზავნის კომპანიას გაწევრიანების/თანამშრომლობის მოთხოვნას.'
  },
  {
    method: 'DELETE',
    path: '/api/Recruiter/join-requests/{joinRequestId}',
    role: 'რეკრუტერი (Recruiter)',
    category: 'Recruiter',
    description: 'აუქმებს გაგზავნილ გაწევრიანების მოთხოვნას.'
  },

  // --- Health ---
  {
    method: 'GET',
    path: '/health',
    role: 'საჯარო / ანონიმური (Anonymous)',
    category: 'Health',
    description: 'აბრუნებს მარტივ JSON პასუხს, რომელიც ადასტურებს, რომ სერვერი მუშაობს გამართულად და აქტიურია.'
  }
];

const categories = ['All', 'Auth', 'Company', 'Talent', 'Recruiter', 'Comments', 'Health'];

export default function EndpointsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const filteredEndpoints = useMemo(() => {
    return endpointsData.filter((ep) => {
      const matchesCategory = selectedCategory === 'All' || ep.category === selectedCategory;
      const matchesSearch =
        ep.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    const total = filteredEndpoints.length;
    const gets = filteredEndpoints.filter(e => e.method === 'GET').length;
    const posts = filteredEndpoints.filter(e => e.method === 'POST').length;
    const puts = filteredEndpoints.filter(e => e.method === 'PUT').length;
    const deletes = filteredEndpoints.filter(e => e.method === 'DELETE').length;
    return { total, gets, posts, puts, deletes };
  }, [filteredEndpoints]);

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => {
      setCopiedPath(null);
    }, 2000);
  };

  return (
    <div className="endpoints-page">
      <style jsx global>{`
        .endpoints-page {
          min-height: 100vh;
          background: var(--content-bg);
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .endpoints-container {
          max-width: 1200px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .endpoints-header {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--blue);
          font-weight: 500;
          text-decoration: none;
          font-size: 14px;
          transition: transform 0.2s;
          align-self: flex-start;
        }
        .back-link:hover {
          transform: translateX(-4px);
        }
        .endpoints-title-area {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .endpoints-title {
          font-size: 32px;
          font-weight: 700;
          color: var(--black);
          line-height: 40px;
        }
        .endpoints-subtitle {
          font-size: 16px;
          color: var(--black-75);
          max-width: 700px;
        }
        
        /* Dashboard Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
        }
        .stat-box {
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.02);
        }
        .stat-num {
          font-size: 28px;
          font-weight: 700;
          color: var(--black);
        }
        .stat-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--black-50);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Controls Section */
        .controls-card {
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);
        }
        .search-container {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          border: 1px solid var(--stroke-gray);
          border-radius: 10px;
          background: var(--light-gray-alt);
          padding: 0 16px;
          height: 48px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-container:focus-within {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px var(--blue-01);
          background: var(--white);
        }
        .search-input {
          flex: 1;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 15px;
          color: var(--black);
          padding-left: 10px;
        }
        .search-container :global(.search-icon) {
          color: var(--black-50);
          font-size: 20px;
        }
        
        .categories-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tab-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          color: var(--black-75);
          background: var(--light-gray);
          border: 1px solid var(--stroke-gray);
          transition: all 0.2s;
        }
        .tab-btn:hover {
          background: var(--stroke-gray-50);
          color: var(--black);
        }
        .tab-btn.active {
          background: var(--blue);
          color: var(--white);
          border-color: var(--blue);
        }

        /* Endpoints Grid */
        .endpoints-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .endpoint-card {
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.02);
        }
        .endpoint-card:hover {
          transform: translateY(-2px);
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);
          border-color: var(--black-50);
        }
        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .route-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          flex: 1;
          min-width: 0;
        }
        .badge-method {
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .badge-method.GET { background: #e6f9ec; color: #08AC16; }
        .badge-method.POST { background: #eaf2fd; color: #2F80ED; }
        .badge-method.PUT { background: #fef4e6; color: #F19100; }
        .badge-method.DELETE { background: #fdebeb; color: #ED5757; }
        
        [data-theme="dark"] .badge-method.GET { background: rgba(8, 172, 22, 0.15); color: #08AC16; }
        [data-theme="dark"] .badge-method.POST { background: rgba(47, 128, 237, 0.15); color: #2F80ED; }
        [data-theme="dark"] .badge-method.PUT { background: rgba(241, 145, 0, 0.15); color: #F19100; }
        [data-theme="dark"] .badge-method.DELETE { background: rgba(237, 87, 87, 0.15); color: #ED5757; }

        .route-path {
          font-family: 'Courier New', Courier, monospace;
          font-weight: 700;
          font-size: 15px;
          color: var(--black);
          word-break: break-all;
        }
        .copy-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          color: var(--black-50);
          background: var(--light-gray);
          border: 1px solid var(--stroke-gray);
          transition: all 0.2s;
          position: relative;
        }
        .copy-button:hover {
          background: var(--stroke-gray);
          color: var(--black);
        }
        .tooltip-copy {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translate(-50%, -8px);
          background: #333;
          color: #fff;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          pointer-events: none;
        }
        .card-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--black-75);
        }
        .meta-label {
          font-weight: 600;
          color: var(--black-50);
        }
        .meta-val {
          background: var(--light-gray-alt);
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 500;
        }
        .card-desc {
          font-size: 14px;
          color: var(--black);
          line-height: 22px;
          border-top: 1px dashed var(--stroke-gray);
          padding-top: 12px;
        }
        
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 32px;
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 16px;
          text-align: center;
          color: var(--black-50);
          gap: 16px;
        }
        .empty-icon {
          font-size: 48px;
          color: var(--icon-gray-50);
        }
        .empty-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--black);
        }
        .empty-subtitle {
          font-size: 14px;
        }
      `}</style>

      <div className="endpoints-container">
        {/* Header */}
        <div className="endpoints-header">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Link href="/" className="back-link">
              <Icon icon="mdi:arrow-left" width="18" />
              მთავარზე დაბრუნება
            </Link>
            <span style={{ color: 'var(--black-50)', opacity: 0.5 }}>|</span>
            <Link href="/info/commits" className="back-link">
              <Icon icon="mdi:git" width="18" /> GitHub კომიტები
            </Link>
            <span style={{ color: 'var(--black-50)', opacity: 0.5 }}>|</span>
            <Link href="/info/showcase" className="back-link">
              <Icon icon="mdi:video" width="18" /> პროექტის პრეზენტაცია (Showcase)
            </Link>
          </div>
          <div className="endpoints-title-area">
            <h1 className="endpoints-title">HRTodo API ენდპოინტები</h1>
            <p className="endpoints-subtitle">
              სისტემის ყველა აქტიური API ენდპოინტის დეტალური დოკუმენტაცია, როლების უფლებები და ფუნქციების აღწერა ქართულ ენაზე.
            </p>
          </div>
        </div>

        {/* Statistical Overview Dashboard */}
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-num">{stats.total}</span>
            <span className="stat-label">სულ ენდპოინტი</span>
          </div>
          <div className="stat-box">
            <span className="stat-num" style={{ color: '#08AC16' }}>{stats.gets}</span>
            <span className="stat-label">GET მოთხოვნა</span>
          </div>
          <div className="stat-box">
            <span className="stat-num" style={{ color: '#2F80ED' }}>{stats.posts}</span>
            <span className="stat-label">POST მოთხოვნა</span>
          </div>
          <div className="stat-box">
            <span className="stat-num" style={{ color: '#F19100' }}>{stats.puts}</span>
            <span className="stat-label">PUT მოთხოვნა</span>
          </div>
          <div className="stat-box">
            <span className="stat-num" style={{ color: '#ED5757' }}>{stats.deletes}</span>
            <span className="stat-label">DELETE მოთხოვნა</span>
          </div>
        </div>

        {/* Live Controls */}
        <div className="controls-card">
          <div className="search-container">
            <Icon icon="mdi:magnify" className="search-icon" />
            <input
              type="text"
              placeholder="მოძებნეთ ენდპოინტის გზა, მეთოდი, აღწერა ან როლი..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ color: 'var(--black-50)' }}>
                <Icon icon="mdi:close" width="20" />
              </button>
            )}
          </div>

          <div className="categories-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? 'ყველა' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Endpoints List */}
        <div className="endpoints-list">
          {filteredEndpoints.length > 0 ? (
            filteredEndpoints.map((ep, idx) => (
              <div key={idx} className="endpoint-card">
                <div className="card-top">
                  <div className="route-info">
                    <span className={`badge-method ${ep.method}`}>{ep.method}</span>
                    <span className="route-path">{ep.path}</span>
                  </div>
                  <button
                    className="copy-button"
                    onClick={() => handleCopy(ep.path)}
                    title="გზის კოპირება"
                  >
                    <Icon icon={copiedPath === ep.path ? "mdi:check" : "mdi:content-copy"} width="16" />
                    {copiedPath === ep.path && (
                      <span className="tooltip-copy">კოპირებულია!</span>
                    )}
                  </button>
                </div>

                <div className="card-meta-row">
                  <span className="meta-label">წვდომის როლი:</span>
                  <span className="meta-val">{ep.role}</span>
                </div>

                <div className="card-desc">
                  {ep.description}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <Icon icon="mdi:database-search-outline" className="empty-icon" />
              <div className="empty-title">ენდპოინტები ვერ მოიძებნა</div>
              <div className="empty-subtitle">
                მითითებული პარამეტრებით ძიებამ შედეგი ვერ გამოიღო. სცადეთ სხვა სიტყვა ან შეცვალეთ კატეგორია.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
