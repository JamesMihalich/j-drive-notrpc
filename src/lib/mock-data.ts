export type File = {
    id: string;
    name: string;
    type: "file";
    parent: string;
    url: string;
    size: string;
    modified: Date;
};
  
export type Folder = {
  id: string;
  name: string;
  type: "folder";
  parent: string | null;
};
  
export const mockFolders: Folder[] = [
  { id: "root", name: "My Drive",       type: "folder", parent: null    },
  { id: "1",    name: "Documents",      type: "folder", parent: "root"  },
  { id: "2",    name: "Images",         type: "folder", parent: "root"  },
  { id: "3",    name: "Work",           type: "folder", parent: "root"  },
  { id: "4",    name: "Presentations",  type: "folder", parent: "3"     }
];
  
export const mockFiles: File[] = [
  {
    id: "f1",
    name: "Resume.pdf",
    type: "file",
    url: "/files/resume.pdf",
    parent: "root",          
    size: "1.2 MB",
    modified: new Date("2024-02-01")
  },
  {
    id: "f2",
    name: "Project Proposal.docx",
    type: "file",
    url: "/files/proposal.docx",
    parent: "1",              // Documents
    size: "2.5 MB",
    modified: new Date("2024-03-15")
  },
  {
    id: "f3",
    name: "Vacation.jpg",
    type: "file",
    url: "/files/vacation.jpg",
    parent: "2",              // Images
    size: "3.7 MB",
    modified: new Date("2023-11-21")
  },
  {
    id: "f4",
    name: "Profile Picture.png",
    type: "file",
    url: "/files/profile.png",
    parent: "2",              // Images
    size: "1.8 MB",
    modified: new Date("2024-01-09")
  },
  {
    id: "f5",
    name: "Q4 Report.pptx",
    type: "file",
    url: "/files/q4-report.pptx",
    parent: "4",              // Presentations
    size: "5.2 MB",
    modified: new Date("2024-04-28")
  },
  {
    id: "f6",
    name: "Budget.xlsx",
    type: "file",
    url: "/files/budget.xlsx",
    parent: "3",              // Work
    size: "1.5 MB",
    modified: new Date("2024-05-12")
  }
];
  