import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEnquiryInput,
  sanitizeEnquiryInput,
  isEnquiryBackendConfigured,
} from './enquiryValidation';
import { SITE_CONTENT } from '../config/siteContent';
import { filterProjectsByCategory } from './workPortfolio';

test('validateEnquiryInput rejects empty required fields with helpful messages', () => {
  const result = validateEnquiryInput({
    name: '   ',
    email: '',
    company: '',
    projectDescription: '',
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.projectDescription);
  assert.equal(result.errors.company, undefined);
});

test('validateEnquiryInput validates email format and description minimum length', () => {
  const result = validateEnquiryInput({
    name: 'Nadeesha Silva',
    email: 'invalid-email-format',
    company: 'Colombo Exports',
    projectDescription: 'Too short',
  });

  assert.equal(result.valid, false);
  assert.equal(result.errors.name, undefined);
  assert.match(result.errors.email ?? '', /valid email address/i);
  assert.match(result.errors.projectDescription ?? '', /at least 15 characters/i);
});

test('validateEnquiryInput accepts valid enquiry with or without optional company', () => {
  const withCompany = validateEnquiryInput({
    name: '  Amara Perera ',
    email: ' amara@example.lk ',
    company: ' Lanka Heritage Tea ',
    projectDescription:
      'We are looking for brand positioning, packaging photography and a new website.',
  });

  assert.equal(withCompany.valid, true);
  assert.deepEqual(withCompany.errors, {});
  assert.equal(withCompany.sanitized.name, 'Amara Perera');
  assert.equal(withCompany.sanitized.email, 'amara@example.lk');
  assert.equal(withCompany.sanitized.company, 'Lanka Heritage Tea');

  const withoutCompany = validateEnquiryInput({
    name: 'Kasun Jayawardena',
    email: 'kasun@domain.com',
    company: '',
    projectDescription: 'Looking to plan an integrated campaign for our upcoming launch.',
  });

  assert.equal(withoutCompany.valid, true);
  assert.equal(withoutCompany.sanitized.company, '');
});

test('sanitizeEnquiryInput safely handles missing keys', () => {
  const sanitized = sanitizeEnquiryInput({});
  assert.deepEqual(sanitized, {
    name: '',
    email: '',
    company: '',
    projectDescription: '',
  });
});

test('isEnquiryBackendConfigured returns false when webhook URL is missing or invalid', () => {
  assert.equal(isEnquiryBackendConfigured({}), false);
  assert.equal(isEnquiryBackendConfigured({ ENQUIRY_WEBHOOK_URL: '' }), false);
  assert.equal(isEnquiryBackendConfigured({ ENQUIRY_WEBHOOK_URL: 'not-a-url' }), false);
  assert.equal(
    isEnquiryBackendConfigured({ ENQUIRY_WEBHOOK_URL: 'https://hooks.example.com/enquiries' }),
    true
  );
});

test('filterProjectsByCategory returns 4 commercials, music videos, and events accurately', () => {
  const allProjects = SITE_CONTENT.selectedWork.projects;

  const commercials = filterProjectsByCategory(allProjects, 'commercials');
  assert.equal(commercials.length, 4);

  const musicVideos = filterProjectsByCategory(allProjects, 'music-videos');
  assert.equal(musicVideos.length, 4);
  assert.ok(SITE_CONTENT.selectedWork.musicVideoArchive.length >= 10);

  const events = filterProjectsByCategory(allProjects, 'events');
  assert.equal(events.length, 2);
});
