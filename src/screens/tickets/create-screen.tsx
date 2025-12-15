'use client';

import React from 'react';
import styled from 'styled-components';
import {ArrowLeft, Loader2, Save} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {Button} from '@/src/components/atoms/button';
import {Card, CardBody} from '@/src/components/atoms/card';
import {Input, Select, TextArea} from '@/src/components/atoms/input';
import {FormField} from '@/src/components/molecules/form-field';
import {ROUTES} from '@/src/constants/routes';
import {
  catalogService,
  FailureCategory,
  FailureType,
  Line,
  SeverityLevel,
  Site,
  ticketService,
  TicketStatus,
  Workstation,
} from '@/src/domain';

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.md};
  margin-bottom: ${({theme}) => theme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({theme}) => theme.colors.gray[800]};
`;

const SectionHeader = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({theme}) => theme.colors.gray[700]};
  border-bottom: 1px solid ${({theme}) => theme.colors.gray[200]};
  padding-bottom: ${({theme}) => theme.spacing.sm};
  margin-bottom: ${({theme}) => theme.spacing.md};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({theme}) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Grid3 = styled(Grid)`
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({theme}) => theme.spacing.sm};
  margin-top: ${({theme}) => theme.spacing.lg};
`;

export function TicketCreateScreen() {
  const router = useRouter();
  const [sites, setSites] = React.useState<Site[]>([]);
  const [lines, setLines] = React.useState<Line[]>([]);
  const [workstations, setWorkstations] = React.useState<Workstation[]>([]);
  const [categories, setCategories] = React.useState<FailureCategory[]>([]);
  const [types, setTypes] = React.useState<FailureType[]>([]);
  const [severities, setSeverities] = React.useState<SeverityLevel[]>([]);
  const [statuses, setStatuses] = React.useState<TicketStatus[]>([]);

  const [isLoadingInit, setIsLoadingInit] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [loadingLines, setLoadingLines] = React.useState(false);
  const [loadingStations, setLoadingStations] = React.useState(false);
  const [loadingTypes, setLoadingTypes] = React.useState(false);

  const [formData, setFormData] = React.useState({
    siteId: '',
    lineId: '',
    workstationId: '',
    failureCategoryId: '',
    failureTypeId: '',
    severityId: '',
    statusId: '',
    title: '',
    description: '',
  });

  React.useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [siteRes, categoryRes, severityRes, statusRes] = await Promise.all([
          catalogService.listSites({perPage: 200}),
          catalogService.listFailureCategories({perPage: 200}),
          catalogService.listSeverityLevels({perPage: 200}),
          ticketService.getStatuses(),
        ]);

        setSites(siteRes.data);
        setCategories(categoryRes.data);
        setSeverities(severityRes.data);
        setStatuses(statusRes);

        const openStatus = statusRes.find(status => status.code === 'OPEN');
        if (openStatus) {
          setFormData(prev => ({...prev, statusId: String(openStatus.id)}));
        }
      } catch (error) {
        console.error('Failed to load catalogs', error);
      } finally {
        setIsLoadingInit(false);
      }
    };

    loadInitialData();
  }, []);

  React.useEffect(() => {
    if (!formData.siteId) {
      setLines([]);
      return;
    }

    const fetchLines = async () => {
      setLoadingLines(true);
      try {
        const lineRes = await catalogService.listLines({filters: {site: formData.siteId}, perPage: 200});
        setLines(lineRes.data);
      } catch (error) {
        console.error('Failed to load lines', error);
        setLines([]);
      } finally {
        setLoadingLines(false);
      }
    };

    fetchLines();
  }, [formData.siteId]);

  React.useEffect(() => {
    if (!formData.lineId) {
      setWorkstations([]);
      return;
    }

    const fetchWorkstations = async () => {
      setLoadingStations(true);
      try {
        const workstationRes = await catalogService.listWorkstations({filters: {line: formData.lineId}, perPage: 200});
        setWorkstations(workstationRes.data);
      } catch (error) {
        console.error('Failed to load workstations', error);
        setWorkstations([]);
      } finally {
        setLoadingStations(false);
      }
    };

    fetchWorkstations();
  }, [formData.lineId]);

  React.useEffect(() => {
    if (!formData.failureCategoryId) {
      setTypes([]);
      return;
    }

    const fetchType = async () => {
      setLoadingTypes(true);
      try {
        const typeRes = await catalogService.listFailureTypes({filters: {category: formData.failureCategoryId}, perPage: 200});
        setTypes(typeRes.data);
      } catch (error) {
        console.error('Failed to load failure types', error);
        setTypes([]);
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchType();
  }, [formData.failureCategoryId]);

  const handleChange =
    (field: keyof typeof formData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setFormData(prev => {
        const next = {...prev, [field]: value};
        if (field === 'siteId') {
          next.lineId = '';
          next.workstationId = '';
        }
        if (field === 'lineId') {
          next.workstationId = '';
        }
        if (field === 'failureCategoryId') {
          next.failureTypeId = '';
        }
        return next;
      });
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await ticketService.createTicket({
        lineId: Number(formData.lineId),
        workstationId: formData.workstationId ? Number(formData.workstationId) : undefined,
        failureTypeId: formData.failureTypeId ? Number(formData.failureTypeId) : undefined,
        severityId: Number(formData.severityId),
        statusId: Number(formData.statusId),
        title: formData.title,
        description: formData.description,
        isHoldLine: false,
      });
      router.push(ROUTES.tickets);
    } catch (error) {
      console.error('Failed to create ticket', error);
      alert('Failed to create ticket. Please check the fields and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingInit) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', padding: '48px'}}>
        <Loader2 className="animate-spin" size={32} color="#0284c7" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader>
        <Link href={ROUTES.tickets}>
          <Button variant="ghost">
            <ArrowLeft size={16} /> Back
          </Button>
        </Link>
        <PageTitle>Open Ticket</PageTitle>
      </PageHeader>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <SectionHeader>Ticket Information</SectionHeader>
            <Grid>
              <FormField label="Title">
                <Input value={formData.title} onChange={handleChange('title')} required />
              </FormField>
              <FormField label="Severity">
                <Select value={formData.severityId} onChange={handleChange('severityId')} required>
                  <option value="">Select severity</option>
                  {severities.map(severity => (
                    <option key={severity.id} value={severity.id}>
                      {severity.name}
                    </option>
                  ))}
                </Select>
              </FormField>
            </Grid>

            <FormField label="Description">
              <TextArea rows={4} value={formData.description} onChange={handleChange('description')} />
            </FormField>

            <SectionHeader>Location</SectionHeader>
            <Grid>
              <FormField label="Site">
                <Select value={formData.siteId} onChange={handleChange('siteId')}>
                  <option value="">Select site</option>
                  {sites.map(site => (
                    <option key={site.id} value={site.id}>
                      {site.name}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField label="Line" loading={loadingLines}>
                <Select value={formData.lineId} onChange={handleChange('lineId')} required>
                  <option value="">Select line</option>
                  {lines.map(line => (
                    <option key={line.id} value={line.id}>
                      {line.name}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField label="Workstation" loading={loadingStations}>
                <Select value={formData.workstationId} onChange={handleChange('workstationId')}>
                  <option value="">Select workstation</option>
                  {workstations.map(workstation => (
                    <option key={workstation.id} value={workstation.id}>
                      {workstation.name}
                    </option>
                  ))}
                </Select>
              </FormField>
            </Grid>

            <SectionHeader>Failure Details</SectionHeader>
            <Grid3>
              <FormField label="Failure Category">
                <Select value={formData.failureCategoryId} onChange={handleChange('failureCategoryId')}>
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField label="Failure Type" loading={loadingTypes}>
                <Select value={formData.failureTypeId} onChange={handleChange('failureTypeId')}>
                  <option value="">Select type</option>
                  {types.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField label="Status">
                <Select value={formData.statusId} onChange={handleChange('statusId')} required>
                  <option value="">Select status</option>
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </Select>
              </FormField>
            </Grid3>

            <FormActions>
              <Button type="button" variant="ghost" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Save size={16} /> Save Ticket</>}
              </Button>
            </FormActions>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
